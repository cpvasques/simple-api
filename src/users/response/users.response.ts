import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UsersResponse {
	@Expose()
	@ApiProperty({ example: '1' })
	id: number;

	@Expose()
	@ApiProperty({ example: 'Nome' })
	name: string;

	@Expose()
	@ApiProperty({ example: 'usuario' })
	login?: string;

	@Expose()
	@ApiProperty({ example: 'email@outlook.com' })
	email?: string;

	@Expose()
	@ApiProperty({ example: 'Empresa Ltda' })
	companyName?: string;

	@Expose()
	@ApiProperty({ example: '5511999887766' })
	phoneNumber: string;

	@Expose()
	@ApiProperty({ example: true })
	active: boolean;

	@Expose()
	@ApiProperty({ example: '2022-04-28T06:28:31.000Z' })
	createdAt: Date;
}
