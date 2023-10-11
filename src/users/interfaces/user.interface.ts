import { Document } from 'mongoose'

export interface User extends Document {
  id: string
  name: string
  mobile: string
  email: string
  password: string
  role: string
  verified: boolean
  status: string
  createdAt: string
  updatedAt: string
}
