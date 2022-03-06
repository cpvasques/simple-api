import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserDto } from '../user/dto/user.dto';

export class GetGamesParams {
	@ApiProperty({ required: false, type: String })
	name: string;

	@ApiProperty({ required: false, type: String })
	category: string;

	@ApiProperty({ required: false, type: String })
	createdBy: string;

	@ApiProperty({ required: false, type: Date })
	createdAt: Date;
}

@Exclude()
export class GetGamesReturn {
	@ApiProperty({ type: Number })
	@Expose()
	id: number;

	@ApiProperty({ type: String })
	@Expose()
	name: string;

	@ApiProperty({ type: String })
	@Expose()
	category: string;

	@ApiProperty({ type: UserDto })
	@Expose()
	createdBy: UserDto;

	@ApiProperty({ type: Date })
	@Expose()
	createdAt: Date;
}
