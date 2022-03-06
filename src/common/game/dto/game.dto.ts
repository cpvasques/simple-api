import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GameResponse {
	@Expose()
	@ApiProperty({ example: 1 })
	id: number;

	@Expose()
	@ApiProperty({ example: 'Nome do jogo' })
	name: string;

	@Expose()
	@ApiProperty({ example: 'FPS' })
	category: string;

	@Expose()
	@ApiProperty({ example: 1 })
	createdBy: number;

	@Expose()
	@ApiProperty({ example: '2022-01-01' })
	createdAt: Date;
}
