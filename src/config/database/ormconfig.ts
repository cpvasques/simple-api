import { DataSource } from 'typeorm';
require('dotenv').config();

const AppDataSource = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	synchronize: false,
	logging: true,
	entities: [process.env.DB_ENTITIES],
	migrations: [process.env.DB_MIGRATIONS],
});

export default AppDataSource;
