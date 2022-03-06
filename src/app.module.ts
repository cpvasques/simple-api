import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from './common/common.module';
import databaseOptions from './config/database/database.config';
import { JwtStrategy } from './auth/jwt/jwt.strategy';
import { User } from './database/entities/User';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot(databaseOptions),
		TypeOrmModule.forFeature([User]),
		SharedModule,
		CommonModule,
	],
	controllers: [AuthController],
	providers: [JwtStrategy],
})
export class AppModule {}
