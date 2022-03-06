import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommonResponse } from 'src/decorators/common-response.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';
import { UserService } from 'src/shared/user/user.service';
import { UserDto } from './dto/user.dto';
import { GetUsersParams, GetUsersReturn } from './users.type';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
	constructor(private usersService: UserService) {}

	@Get()
	@CommonResponse([{ status: 200 }])
	getUsers(@Query() getUsersParams?: GetUsersParams): Promise<GetUsersReturn[]> {
		return this.usersService.getUsers(getUsersParams);
	}

	@Get('data')
	@CommonResponse([{ status: 200 }])
	getUserData(@CurrentUser() userDto: UserDto): Promise<GetUsersReturn> {
		return this.usersService.getUserData(userDto);
	}
}
