import Joi from 'joi'

export const validationOptions = {
  abortEarly: true,
  allowUnknown: true
}

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .trim()
    .valid('development', 'testing', 'staging', 'production')
    .default('development'),
  DATABASE_URL: Joi.string().trim().empty(false).required(),
  JWT_SECRET: Joi.string().trim().empty(false).required(),
  JWT_TTL: Joi.string().trim().empty(false).required()
})
