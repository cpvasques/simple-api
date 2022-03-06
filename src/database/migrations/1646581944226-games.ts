import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class games1646581944226 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'games',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'category',
						type: 'varchar',
					},
					{
						name: 'created_by',
						type: 'int',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
			}),
		);

		await queryRunner.createForeignKey(
			'games',
			new TableForeignKey({
				columnNames: ['created_by'],
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('games');

		const foreignKeyCreatedBy = table.foreignKeys.find(
			(fk) => fk.columnNames.indexOf('created_by') !== -1,
		);

		await queryRunner.dropForeignKey('games', foreignKeyCreatedBy);
		await queryRunner.dropTable('games');
	}
}
