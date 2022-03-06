import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UsersController } from './user/user.controller';
import { GameController } from './game/game.controller';

@Module({
	imports: [SharedModule],
	controllers: [UsersController, GameController],
})
export class CommonModule {}
