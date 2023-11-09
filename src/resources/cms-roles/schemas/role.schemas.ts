import mongoose from 'mongoose'

const COLLECTION_NAME = 'Roles'
export const RoleSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    permissions: [{ type: mongoose.Types.ObjectId, ref: 'Permission' }],
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

RoleSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    // delete ret.isDeleted
    delete ret.__v
  }
})
