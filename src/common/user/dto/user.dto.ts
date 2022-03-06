import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
	@Expose()
	@ApiProperty({ example: 1 })
	id: number;

	@Expose()
	@ApiProperty({ example: 'username' })
	username: string;

	@Expose()
	@ApiProperty({ example: 'Nome' })
	name: string;

	@Expose()
	@ApiProperty({ example: 'email@gmail.com' })
	email: string;
}
