import * as mongoose from 'mongoose'
import { Permission } from '../dto/general.dto'
const Schema = mongoose.Schema

const COLLECTION_NAME = 'apiKeys'
export const ApiKeySchema = new Schema(
  {
    apiKey: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: Boolean,
      default: true
    },
    permissions: {
      type: [
        {
          type: String,
          enum: Object.values(Permission)
        }
      ],
      require: true,
      default: [Permission.READ]
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

ApiKeySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
  }
})
