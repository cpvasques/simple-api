import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, Min } from 'class-validator';

export class FiltersUserDto {
	@ApiProperty({ required: true, example: 1 })
	@Transform(({ value }) => (isNaN(value) ? 0 : parseInt(value)))
	@IsDefined({ message: 'Obrigatório' })
	@IsNumber({}, { message: 'Página Inválida' })
	page?: number;

	@ApiProperty({ required: true, example: 10 })
	@Transform(({ value }) => (isNaN(value) ? 0 : parseInt(value)))
	@IsDefined({ message: 'Obrigatório' })
	@IsNumber({}, { message: 'Página Inválida' })
	@Min(1, { message: 'Página inválida' })
	limit?: number;
}
