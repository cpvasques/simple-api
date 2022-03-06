import 'dotenv/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const {
	DB_HOST,
	DB_PORT,
	DB_USERNAME,
	DB_PASSWORD,
	DB_DATABASE,
	DB_ENTITIES,
	DB_MIGRATIONS,
	DB_MIGRATIONS_DIR,
	DB_ENTITIES_DIR,
} = process.env;

const databaseOptions: MysqlConnectionOptions = {
	type: 'mysql',
	host: DB_HOST,
	port: Number(DB_PORT),
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	entities: [DB_ENTITIES],
	migrations: [DB_MIGRATIONS],
	cli: { migrationsDir: DB_MIGRATIONS_DIR, entitiesDir: DB_ENTITIES_DIR },
	synchronize: false,
	logging: true,
};

export default databaseOptions;
