import mongoose from 'mongoose'

const COLLECTION_NAME = 'Permissions'
export const PermissionSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    key: {
      type: String
    },
    description: {
      type: String
    },
    roles: [{ type: mongoose.Types.ObjectId, ref: 'Role' }],
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

PermissionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    // delete ret.isDeleted
    delete ret.__v
  }
})
