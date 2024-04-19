import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const swaggerConfig = new DocumentBuilder()
		.setTitle('API Teste')
		.setDescription('Descrição XPTO')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	app.enableCors({
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIOS',
		allowedHeaders: 'Content-Type, Accept, Authorization',
		preflightContinue: false,
		optionsSuccessStatus: 200,
	});

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('/docs', app, document);

	await app.listen(3000);
}
bootstrap();
