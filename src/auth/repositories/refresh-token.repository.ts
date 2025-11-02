import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import type { StringValue } from 'ms'
import { Repository } from 'typeorm'
import { RefreshToken } from '../entities/refresh-token.entity'
import { compareToken, hashToken } from '../utils/bcrypt.util'
import {
  decodeToken,
  extractTokenExpiration,
  signRefreshToken,
  verifyRefreshToken,
  type UserInfo,
} from '../utils/token.util'

export interface RequestMetadata {
  userAgent?: string
  ipAddress?: string
}

/**
 * Repository for RefreshToken operations
 * Handles all database interactions and token persistence
 */
@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repo: Repository<RefreshToken>,
    private readonly jwt: JwtService,
  ) {}

  /**
   * Find all refresh tokens for a user
   */
  findByUserId(userId: string): Promise<RefreshToken[]> {
    return this.repo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    })
  }

  /**
   * Find all refresh tokens (for logout without user context)
   */
  findAll(limit: number = 500): Promise<RefreshToken[]> {
    return this.repo.find({ where: {}, take: limit })
  }

  /**
   * Persist a refresh token to database
   */
  async save(
    userId: string,
    rawToken: string,
    meta?: RequestMetadata,
  ): Promise<RefreshToken> {
    const tokenHash = await hashToken(rawToken)
    const decoded = decodeToken(this.jwt, rawToken)
    const expSec = extractTokenExpiration(decoded)

    const rt = this.repo.create({
      userId,
      tokenHash,
      expiresAt: new Date(expSec * 1000),
      userAgent: meta?.userAgent,
      ip: meta?.ipAddress,
    })

    return await this.repo.save(rt)
  }

  /**
   * Find matching active token from candidates
   */
  async findMatchedToken(
    candidates: RefreshToken[],
    rawToken: string,
  ): Promise<RefreshToken | null> {
    const results = await Promise.all(
      candidates.map(async (token) => ({
        token,
        isMatch: await compareToken(rawToken, token.tokenHash),
      })),
    )

    const matched = results.find((r) => r.isMatch)
    return matched ? matched.token : null
  }

  /**
   * Revoke a single token by ID
   */
  async revoke(id: string): Promise<void> {
    await this.repo.update({ id }, { revokedAt: new Date() })
  }

  /**
   * Mark token as replaced by a new one
   */
  async markAsReplaced(oldId: string, newId: string): Promise<void> {
    await this.repo.update(
      { id: oldId },
      { revokedAt: new Date(), replacedByTokenId: newId },
    )
  }

  /**
   * Revoke all tokens for a user (security measure)
   */
  async revokeAllForUser(userId: string): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .update()
      .set({ revokedAt: () => 'NOW()' })
      .where('userId = :userId', { userId })
      .execute()
  }

  /**
   * Create a new refresh token (Technical Operation)
   */
  createRefreshToken(user: UserInfo): string {
    const secret = process.env.REFRESH_SECRET!
    const expiresIn = (process.env.REFRESH_EXPIRES || '7d') as StringValue
    return signRefreshToken(this.jwt, user, secret, expiresIn)
  }

  /**
   * Verify refresh token signature and expiration (Technical Operation)
   */
  async verifyRefreshToken(token: string) {
    const secret = process.env.REFRESH_SECRET!
    return await verifyRefreshToken(this.jwt, token, secret)
  }
}
