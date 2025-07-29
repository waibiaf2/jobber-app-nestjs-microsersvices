import { registerAs } from '@nestjs/config';

export const BaseConfig = registerAs('baseConfig', () => ({
  appName: process.env.APP_NAME || 'Jobber Auth',
}));
