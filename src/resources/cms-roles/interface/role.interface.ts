import { Document } from 'mongoose'

export interface Role extends Document {
  id: string
  title: string
  description: string
  isDeleted: boolean
  permissions: Array<string>
}
