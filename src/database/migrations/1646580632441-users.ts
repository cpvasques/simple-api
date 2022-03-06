import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class users1639356625484 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'int',
						length: '11',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'username',
						type: 'varchar',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'name',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'email',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'password',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
						isNullable: true,
					},
				],
			}),
			true,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}
