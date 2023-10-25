import mongoose from 'mongoose' // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'keyTokens'
export const KeyTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    publicKey: {
      type: String,
      required: true
    },

    privateKey: {
      type: String,
      required: true
    },

    refreshToken: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)
