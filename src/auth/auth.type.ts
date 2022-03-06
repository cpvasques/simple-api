import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RegisterUserReturn {
	@ApiProperty({ type: Number })
	@Expose()
	id: number;

	@ApiProperty({ type: String })
	@Expose()
	username: string;

	@ApiProperty({ type: String })
	@Expose()
	name: string;

	@ApiProperty({ type: String })
	@Expose()
	email: string;

	@ApiProperty({ type: Date })
	@Expose()
	created_at: Date;
}

export class LoginUserReturn {
	@ApiProperty({ type: String })
	token: string;
}
