import mongoose from 'mongoose' // Erase if already required

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
      type: Array,
      default: []
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
