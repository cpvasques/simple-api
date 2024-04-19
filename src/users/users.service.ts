import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { paginate } from 'nestjs-typeorm-paginate';
import { Not, Repository } from 'typeorm';

import { User } from 'src/database/entities/User';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersResponse } from './response/users.response';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async create(createUserDto: CreateUserDto) {
		const { email } = createUserDto;

		const user: User = await this.userRepository.findOne({ where: { email } });

		if (user) {
			throw new BadRequestException('Email já cadastrado');
		}

		const createdUser = this.userRepository.create(createUserDto);
		const savedUser = await this.userRepository.save(createdUser);

		return plainToClass(UsersResponse, savedUser);
	}

	async findAll(queryParams) {
		const users = this.userRepository.createQueryBuilder('users').distinct();

		const responsePaginate = await paginate<UsersResponse>(users, {
			page: queryParams.page ?? 1,
			limit: queryParams.limit ?? 10,
		});

		const items = plainToClass(UsersResponse, responsePaginate.items);

		return {
			items,
			meta: responsePaginate.meta,
		};
	}

	async findOne(id: number) {
		const user: User = await this.userRepository.findOne({ where: { id } });

		if (!user) {
			throw new BadRequestException('Usuário nāo encontrado');
		}

		return plainToClass(UsersResponse, user);
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const user: User = await this.userRepository.findOne({ where: { id: id } });

		if (!user) {
			throw new BadRequestException('Usuário nāo encontrado');
		}

		if (updateUserDto.email) {
			const checkEmail: User = await this.userRepository.findOne({
				where: { email: updateUserDto.email, id: Not(id) },
			});

			if (checkEmail) {
				throw new BadRequestException('Email já registrado');
			}
		}

		const newUser = await this.userRepository.save({
			...user,
			...updateUserDto,
		});

		return plainToClass(UsersResponse, newUser);
	}

	async remove(id: number) {
		const user: User = await this.userRepository.findOne({ where: { id } });

		if (!user) {
			throw new BadRequestException('Usuário nāo encontrado');
		}

		await this.userRepository.update({ id: user.id }, { active: false });
	}
}
