import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt/jwt.strategy';
import databaseOptions from './config/database/database.config';
import { User } from './database/entities/User';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(databaseOptions),
		AuthModule,
		UsersModule,
		TypeOrmModule.forFeature([User]),
	],
	controllers: [],
	providers: [JwtStrategy],
})
export class AppModule {}
