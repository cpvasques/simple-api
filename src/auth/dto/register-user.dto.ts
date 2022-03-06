import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDTO {
	@ApiProperty({ type: String, required: true })
	@IsNotEmpty({ message: 'Username não informado' })
	@IsString()
	username: string;

	@ApiProperty({ type: String, required: true })
	@IsNotEmpty({ message: 'Nome não informado' })
	@IsString()
	name: string;

	@ApiProperty({ type: String, required: true })
	@IsNotEmpty({ message: 'Email não informado' })
	@IsString()
	email: string;

	@ApiProperty({ type: String, required: true })
	@IsNotEmpty({ message: 'Senha não informada' })
	@IsString()
	password: string;
}
