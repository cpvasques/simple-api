import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class GetUsersParams {
	@ApiProperty({ required: false, type: String })
	search: string;
}
@Exclude()
export class GetUsersReturn {
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
