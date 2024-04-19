import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
	@ApiProperty({ type: String })
	token: string;
}
