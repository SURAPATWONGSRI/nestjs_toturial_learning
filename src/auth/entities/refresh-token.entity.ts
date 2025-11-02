import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../../users/entities/user.entity'

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User

  @Column() userId: string

  // เก็บเป็น hash เท่านั้น
  @Column() tokenHash: string

  @Column({ type: 'timestamptz' }) expiresAt: Date

  @Column({ type: 'timestamptz', nullable: true }) revokedAt?: Date
  @Column({ nullable: true }) replacedByTokenId?: string

  @Column({ nullable: true }) userAgent?: string
  @Column({ nullable: true }) ip?: string

  @CreateDateColumn() createdAt: Date
}
