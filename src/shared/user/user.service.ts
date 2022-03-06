import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/common/user/dto/user.dto';
import { GetUsersParams, GetUsersReturn } from 'src/common/user/users.type';
import { User } from 'src/database/entities/User';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async getUsers(getUsersParams: GetUsersParams): Promise<GetUsersReturn[]> {
		try {
			const { search } = getUsersParams;
			let users: User[];

			if (search) {
				users = await this.userRepository.find({
					where: [
						{ username: Like(`%${search}`) },
						{ name: Like(`%${search}`) },
						{ email: Like(`%${search}`) },
					],
				});
			} else {
				users = await this.userRepository.find();
			}

			if (!users) {
				throw new NotFoundException('Nenhum usuário encontrado');
			}

			return plainToClass(GetUsersReturn, users);
		} catch (err) {
			throw new HttpException(err?.message, err?.statusCode || err?.response?.statusCode);
		}
	}

	async getUserData(user: UserDto): Promise<GetUsersReturn> {
		const userData = await this.userRepository.findOne(user.id);
		return plainToClass(GetUsersReturn, userData);
	}
}
