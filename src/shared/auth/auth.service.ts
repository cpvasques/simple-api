import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { User } from '../../database/entities/User';
import { RegisterUserDTO } from '../../auth/dto/register-user.dto';
import { LoginUserReturn, RegisterUserReturn } from '../../auth/auth.type';
import { LoginUserDTO } from '../../auth/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/shared/user/user.service';
import { UserDto } from 'src/common/user/dto/user.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private jwtService: JwtService,
		private usersService: UserService,
	) {}

	async registerUser(registerUserDTO: RegisterUserDTO): Promise<RegisterUserReturn> {
		try {
			const { username } = registerUserDTO;

			const user: User = await this.userRepository.findOne({ where: { username } });

			if (user) {
				throw new BadRequestException('Username já cadastrado');
			}

			const createdUser = this.userRepository.create(registerUserDTO);
			const savedUser = await this.userRepository.save(createdUser);

			return plainToClass(RegisterUserReturn, savedUser);
		} catch (err) {
			throw new HttpException(err?.response?.message, err?.status || err?.response?.statusCode);
		}
	}

	async loginUser(loginUserDTO: LoginUserDTO): Promise<LoginUserReturn> {
		try {
			const { username, password } = loginUserDTO;

			const user = await this.userRepository.findOne({ where: { username } });

			if (!user) {
				throw new BadRequestException('Username ou senha inválidos');
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid) {
				throw new BadRequestException('Username ou senha inválidos');
			}

			const userDto = plainToClass(UserDto, user);
			const jwtPayload: any = {
				...userDto,
				[this.createTokenHashFiller()]: this.createTokenHashFiller(),
			};
			const token = this.jwtService.sign(this.shuffleObjectKeys(jwtPayload), {
				expiresIn: '24h',
			});

			return { token };
		} catch (err) {
			throw new HttpException(err?.response?.message, err?.status || err?.response?.statusCode);
		}
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
