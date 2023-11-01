import { Document } from 'mongoose'

export interface Permission extends Document {
  id: string
  key: string
  title: string
  description: string
  isDeleted: boolean
  roles: Array<string>
}
