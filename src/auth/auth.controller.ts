import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../shared/auth/auth.service';
import { CommonResponse } from '../decorators/common-response.decorator';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserReturn, RegisterUserReturn } from './auth.type';
import { LoginUserDTO } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/register')
	@CommonResponse([{ status: 201, type: RegisterUserReturn }])
	registerUser(@Body() registerUserDTO: RegisterUserDTO): Promise<RegisterUserReturn> {
		return this.authService.registerUser(registerUserDTO);
	}

	@Post('/login')
	@CommonResponse([{ status: 201, type: LoginUserReturn }])
	loginUser(@Body() loginUserDTO: LoginUserDTO): Promise<LoginUserReturn> {
		return this.authService.loginUser(loginUserDTO);
	}
}
