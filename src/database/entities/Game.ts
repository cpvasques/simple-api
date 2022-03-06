import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('games')
export class Game {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', nullable: false, unique: true })
	name: string;

	@Column({ type: 'varchar', nullable: false })
	category: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'created_by' })
	createdBy?: User;

	@Column({
		type: 'timestamp',
		name: 'created_at',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;
}
