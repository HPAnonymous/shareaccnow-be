import { Document } from 'mongoose'

export interface ApiKey extends Document {
  apiKey: string
  permissions: string
  status: string
  createdAt: string
  updatedAt: string
}
