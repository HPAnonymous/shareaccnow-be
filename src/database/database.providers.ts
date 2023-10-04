import * as mongoose from 'mongoose'

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        'mongodb+srv://admin:AyStp6pdJewvvDR1@cluster0.8hlen5m.mongodb.net/?retryWrites=true&w=majority',
        {
          maxPoolSize: 50
        }
      )
  }
]
