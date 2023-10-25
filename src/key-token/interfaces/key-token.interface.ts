import { Document } from 'mongoose'

export interface KeyToken extends Document {
  userId: string
  publicKey: string
  privateKey: string
  refreshToken: Array<string>
}
