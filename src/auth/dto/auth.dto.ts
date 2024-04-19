import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

export class AuthDto {
	@Expose()
	@ApiProperty({ example: 'email@outlook.com' })
	@IsDefined()
	@IsString()
	login: string;

	@Expose()
	@ApiProperty({ example: 'Senha123' })
	@IsDefined()
	@IsString()
	password: string;
}
