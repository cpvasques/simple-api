import { InternalServerErrorException } from '@nestjs/common';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', nullable: false, unique: true })
	username: string;

	@Column({ type: 'varchar', nullable: false })
	name: string;

	@Column({ type: 'varchar', nullable: false })
	email: string;

	@Column({ type: 'varchar', nullable: false })
	password: string;

	@Column({
		type: 'timestamp',
		nullable: false,
		name: 'created_at',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@BeforeInsert()
	async hashPassword?(): Promise<void> {
		if (this.password) {
			try {
				this.password = await bcrypt.hash(this.password, 10);
			} catch (err) {
				throw new InternalServerErrorException(err);
			}
		}
	}
}
