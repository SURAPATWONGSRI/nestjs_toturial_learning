import { InternalServerErrorException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

export const hashPassword = async (
  plainText: string,
  rounds = 12,
): Promise<string> => {
  try {
    return await bcrypt.hash(plainText, rounds)
  } catch (error) {
    throw new InternalServerErrorException('Failed to hash password')
  }
}

export const comparePassword = async (
  plainText: string,
  hash: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainText, hash)
  } catch (error) {
    throw new InternalServerErrorException('Failed to compare passwords')
  }
}

export const hashToken = async (token: string): Promise<string> => {
  try {
    return await bcrypt.hash(token, 12)
  } catch (error) {
    throw new InternalServerErrorException('Failed to hash token')
  }
}

export const compareToken = async (
  token: string,
  hash: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(token, hash)
  } catch (error) {
    throw new InternalServerErrorException('Failed to compare tokens')
  }
}
