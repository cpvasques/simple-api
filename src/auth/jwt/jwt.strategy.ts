import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/User';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any) {
		const user = await this.userRepository.findOne(payload.id);

		if (!user) {
			throw new UnauthorizedException('Nenhum token informado na requisição');
		}

		return { id: user?.id };
	}
}
