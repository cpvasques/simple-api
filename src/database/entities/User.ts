import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', nullable: true, length: 255 })
	@Index({ unique: true, where: 'login IS NOT NULL' })
	login: string;

	@Column({ type: 'varchar', nullable: false, length: 255 })
	name: string;

	@Column({ type: 'varchar', nullable: true, length: 255 })
	companyName: string;

	@Column({ type: 'varchar', nullable: true, length: 255 })
	@Index({ unique: true, where: 'email IS NOT NULL' })
	email: string;

	@Column({ type: 'varchar', nullable: true, length: 255 })
	password: string;

	@Column({ type: 'varchar', nullable: true, length: 255 })
	phoneNumber: string;

	@Column({ type: 'boolean', default: true })
	active: boolean;

	@CreateDateColumn({
		type: 'timestamp',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', nullable: true })
	deletedAt: Date;

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
