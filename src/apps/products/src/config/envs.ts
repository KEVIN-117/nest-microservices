import 'dotenv/config';
import * as joi from 'joi';

interface IEnvs {
  PORT: number;
  NODE_ENV: string;
  DATABASE_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().default(3000),
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test')
      .default('development'),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value, warning } = envsSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

if (warning) {
  console.warn(`Config validation warning: ${warning.message}`);
}

export const envs: IEnvs = value as IEnvs;
