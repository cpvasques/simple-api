import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { GetGamesReturn } from 'src/common/game/game.type';
import { Game } from 'src/database/entities/Game';
import { NewGameDTO } from 'src/common/game/dto/new-game.dto';
import { UpdateGameDTO } from 'src/common/game/dto/update-game.dto';
import { UserDto } from 'src/common/user/dto/user.dto';

@Injectable()
export class GameService {
	constructor(
		@InjectRepository(Game)
		private gameRepository: Repository<Game>, // private agreementRepository: Repository<Agreement>,
	) {}

	async getGames(): Promise<GetGamesReturn[]> {
		try {
			let games = await this.gameRepository.createQueryBuilder('games').getMany();

			if (!games) {
				throw new NotFoundException('Games não encontrados');
			}

			return plainToClass(GetGamesReturn, games);
		} catch (err) {
			throw new HttpException(err?.response?.message, err?.status || err?.response?.statusCode);
		}
	}

	async getGameById(id: number): Promise<GetGamesReturn> {
		try {
			const game: Game = await this.gameRepository.findOne({
				where: { id },
			});

			if (!game) {
				throw new NotFoundException(`Game ${id} não encontrado`);
			}

			return plainToClass(GetGamesReturn, game);
		} catch (err) {
			throw new HttpException(err?.response?.message, err?.status || err?.response?.statusCode);
		}
	}

	async createGame(newGameDTO: NewGameDTO, currentUser: UserDto): Promise<GetGamesReturn> {
		console.log('????');

		try {
			console.log(newGameDTO);
			console.log(currentUser);
			const createdGame = this.gameRepository.create({
				...newGameDTO,
				createdBy: currentUser,
			});

			const savedGame = await this.gameRepository.save(createdGame);

			return plainToClass(GetGamesReturn, savedGame);
		} catch (err) {
			console.log('aqui?');

			throw new HttpException(err?.response?.message, err?.status || err?.response?.statusCode);
		}
	}

	async updateGame(id: number, updateGameDTO: UpdateGameDTO): Promise<GetGamesReturn> {
		try {
			const game = await this.gameRepository.findOne({ where: { id } });

			if (!game) {
				throw new NotFoundException('Game não encontrado');
			}

			const savedGame = await this.gameRepository.save({
				...game,
				...updateGameDTO,
			});

			return plainToClass(GetGamesReturn, savedGame);
		} catch (err) {
			throw new HttpException(err?.response?.message, err?.status || err?.response?.statusCode);
		}
	}

	async deleteGame(id: number): Promise<void> {
		try {
			this.gameRepository.delete(id);
		} catch (err) {
			throw new HttpException(err?.response?.message, err?.status || err?.response?.statusCode);
		}
	}
}
