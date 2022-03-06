import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/User';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { Game } from 'src/database/entities/Game';
import { GameService } from './game/game.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Game]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				return {
					secret: configService.get<string>('JWT_SECRET'),
					signOptions: {
						expiresIn: configService.get<string>('JWT_EXPIRE'),
					},
				};
			},
			inject: [ConfigService],
		}),
	],
	providers: [AuthService, UserService, GameService],
	exports: [AuthService, UserService, GameService],
})
export class SharedModule {}
