import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
	@Expose()
	@ApiProperty({ example: 'Jonas' })
	@IsDefined()
	@IsString()
	name: string;

	@Expose()
	@ApiProperty({ example: 'jonas.dark@gmail.com' })
	@IsDefined()
	@IsEmail()
	email: string;

	@Expose()
	@ApiProperty({ example: 'Empresa Ltda' })
	@IsOptional()
	@IsString()
	companyName: string;

	@Expose()
	@ApiProperty({ example: '123456' })
	@IsDefined()
	@IsString()
	password: string;

	@Expose()
	@ApiProperty({ example: '5511999887766' })
	@IsDefined()
	@IsString()
	phoneNumber: string;
}
