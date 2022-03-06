import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDTO {
	@ApiProperty({ type: String, required: true })
	@IsNotEmpty({ message: 'Login não informado' })
	@IsString()
	username: string;

	@ApiProperty({ type: String, required: true })
	@IsNotEmpty({ message: 'Senha não informada' })
	@IsString()
	password: string;
}
