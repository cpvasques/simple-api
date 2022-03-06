import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NewGameDTO {
	@ApiProperty({ type: String, required: true })
	@IsNotEmpty({ message: 'Nome não informado.' })
	@IsString()
	name: string;

	@ApiProperty({ type: String, required: true })
	@IsNotEmpty({ message: 'Categoria não informada.' })
	@IsString()
	category: string;
}
