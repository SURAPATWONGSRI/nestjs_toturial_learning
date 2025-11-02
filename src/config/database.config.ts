import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

/**
 * Database configuration factory
 * Separates database setup from module definition
 */
export const getDatabaseConfig = (
  config: ConfigService,
): TypeOrmModuleOptions => {
  const isDevelopment = config.get<string>('NODE_ENV') !== 'production'

  return {
    type: 'postgres',
    host: config.get<string>('DB_HOST', 'localhost'),
    port: config.get<number>('DB_PORT', 5432),
    username: config.get<string>('DB_USER', 'postgres'),
    password: config.get<string>('DB_PASS', 'postgres'),
    database: config.get<string>('DB_NAME', 'authdb'),
    autoLoadEntities: true,
    synchronize: isDevelopment, // dev only!
    logging: isDevelopment ? ['query', 'error', 'schema', 'warn', 'info'] : false,
    logger: 'advanced-console',
    maxQueryExecutionTime: 1000, // warn if query takes > 1s
  }
}
