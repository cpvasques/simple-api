import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from 'src/database/entities/User';

import { AuthDto } from './dto/auth.dto';
import { AuthResponse } from './response/auth.response';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@InjectRepository(User) private userRepository: Repository<User>,
	) {}

	async login(authDto: AuthDto): Promise<AuthResponse> {
		let user = null;
		const { login, password } = authDto;

		user = await this.userRepository.findOne({
			where: { email: login },
		});

		if (!user) {
			throw new BadRequestException('Login ou senha inválidos');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new BadRequestException('Login ou senha inválidos');
		}

		const jwtPayload: any = {
			id: user.id,
			[this.createTokenHashFiller()]: this.createTokenHashFiller(),
		};

		const token = this.jwtService.sign(this.shuffleObjectKeys(jwtPayload), {
			expiresIn: '24h',
		});

		return { token };
	}

	private shuffleObjectKeys(obj: any) {
		const shuffled = {};
		const keys = Object.keys(obj);
		keys.sort(() => Math.random() - 0.5);
		keys.forEach((k) => (shuffled[k] = obj[k]));
		return shuffled;
	}

	private createTokenHashFiller() {
		const getPrimes = (min, max) => {
			const result = Array(max + 1)
				.fill(0)
				.map((_, i) => i);
			for (let i = 2; i <= Math.sqrt(max + 1); i++) {
				for (let j = i ** 2; j < max + 1; j += i) delete result[j];
			}
			return Object.values(result.slice(Math.max(min, 2)));
		};

		const getRandNum = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1) + min);
		};

		const getRandPrime = (min, max) => {
			const primes = getPrimes(min, max);
			return primes[getRandNum(0, primes.length - 1)];
		};

		const primeHash = Buffer.from(getRandPrime(1, 1000000).toString(), 'binary').toString('base64');
		const randomHash = Buffer.from(Math.random().toString().split('.')[1], 'binary').toString(
			'base64',
		);

		const hash = Buffer.from(primeHash.concat(randomHash.concat(primeHash)), 'binary').toString(
			'hex',
		);
		return hash;
	}
}
