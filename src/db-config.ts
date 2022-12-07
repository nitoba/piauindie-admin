import { BaseKeystoneTypeInfo, DatabaseConfig } from '@keystone-6/core/types'

export const dbConfig: DatabaseConfig<BaseKeystoneTypeInfo> = {
  provider: 'postgresql',
  url: process.env.DATABASE_URL ?? '',
  shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  useMigrations: true,
}
