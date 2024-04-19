import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from 'src/guards/jwt.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { FiltersUserDto } from './dto/filters-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersResponse } from './response/users.response';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiResponse({ status: 201, type: UsersResponse })
	@ApiBody({ type: CreateUserDto })
	create(@Body() createUserDto: CreateUserDto): Promise<UsersResponse> {
		return this.usersService.create(createUserDto);
	}

	@Get()
	@ApiResponse({ status: 201, type: UsersResponse, isArray: true })
	findAll(@Query() queryParams: FiltersUserDto) {
		return this.usersService.findAll(queryParams);
	}

	@Get(':id')
	@ApiResponse({ status: 201, type: UsersResponse })
	findOne(@Param('id') id: string): Promise<UsersResponse> {
		return this.usersService.findOne(+id);
	}

	@Patch(':id')
	@ApiResponse({ status: 201, type: UsersResponse })
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id);
	}
}
