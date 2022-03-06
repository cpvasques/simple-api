import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetGamesReturn } from './game.type';
import { CommonResponse } from '../../decorators/common-response.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserDto } from '../user/dto/user.dto';
import { NewGameDTO } from './dto/new-game.dto';
import { GameService } from 'src/shared/game/game.service';

@ApiTags('Games')
@ApiBearerAuth()
@Controller('game')
@UseGuards(JwtGuard)
export class GameController {
	constructor(private gameService: GameService) {}

	@Get()
	@CommonResponse([{ status: 200, type: GetGamesReturn, isArray: true }])
	getGames(): Promise<GetGamesReturn[]> {
		return this.gameService.getGames();
	}

	@Get('/:id')
	@CommonResponse([{ status: 200, type: GetGamesReturn }])
	getGameById(@Param('id') id?: number): Promise<GetGamesReturn> {
		return this.gameService.getGameById(id);
	}

	@Post()
	@CommonResponse([{ status: 201, type: GetGamesReturn }])
	newGame(
		@Body() newGameDTO: NewGameDTO,
		@CurrentUser() userDto: UserDto,
	): Promise<GetGamesReturn> {
		console.log('ué caralho');

		return this.gameService.createGame(newGameDTO, userDto);
	}

	@Patch('/:id')
	@CommonResponse([{ status: 200, type: GetGamesReturn }])
	modifyGame(@Param('id') id: number, @Body() modifyGameDTO: NewGameDTO): Promise<GetGamesReturn> {
		return this.gameService.updateGame(id, modifyGameDTO);
	}

	@Delete('/:id')
	@CommonResponse([{ status: 200 }])
	deleteGame(@Param('id') id: number): Promise<void> {
		return this.gameService.deleteGame(id);
	}
}
