import env from 'env-var';

export const envs = {
  PROD: env.get('PROD').required().asBool(),
  CLIENT_ID: env.get('CLIENT_ID').required().asString(),
  API_TOKEN: env.get('APP_TOKEN').required().asString(),
  API_VERSION: env.get('API_VERSION').required().asString(),
};
