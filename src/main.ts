/*Custom Configs and Imports*/
import 'reflect-metadata';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

/* Load .env when NOT in Production */
const environment = (process.env.NODE_ENV || 'env').toLowerCase();
if (environment !== 'prod' && environment !== 'production') {
	const envPath = join(__dirname, '..', '.env');
	dotenv.config({ path: envPath });
}

/* Nest Core Imports */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

/* Main Function */
async function bootstrap() {
	/* Express API and Port Def */
	const port = process.env.PORT || 3000;
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	/* Global Validation for all endpoints */
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Simple API')
		.setDescription('Simple API')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	app.enableCors({
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		allowedHeaders: 'Content-Type, Accept, Authorization',
		preflightContinue: false,
		optionsSuccessStatus: 200,
	});

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('/docs', app, document);

	await app.listen(port);
}
bootstrap();
