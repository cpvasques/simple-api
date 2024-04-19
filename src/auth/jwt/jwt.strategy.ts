import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { User } from 'src/database/entities/User';

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
		const user = await this.userRepository.findOne({ where: { id: payload.id } });

		if (!user) {
			throw new UnauthorizedException('Nenhum token informado na requisição');
		}

		return { id: user?.id, name: user?.name };
	}
}
