import mongoose from 'mongoose' // Erase if already required
import { Role } from '../dto/general.dto'

// Declare the Schema of the Mongo model

const COLLECTION_NAME = 'users'
export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    mobile: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive'
    },
    roles: {
      type: [
        {
          type: String,
          enum: Object.values(Role)
        }
      ],
      default: [Role.MEMBER]
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id
    delete ret.password
    delete ret.__v
  }
})
