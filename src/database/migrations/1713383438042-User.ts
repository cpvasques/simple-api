import { MigrationInterface, QueryRunner } from "typeorm";

export class User1713383438042 implements MigrationInterface {
    name = 'User1713383438042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`login\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`companyName\` varchar(255) NULL, \`email\` varchar(255) NULL, \`password\` varchar(255) NULL, \`phoneNumber\` varchar(255) NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, UNIQUE INDEX \`IDX_938b5778e2b4ed8996d673ccae\` (\`login\`), UNIQUE INDEX \`IDX_9e3516cf97a57b6f6199fa95a8\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_9e3516cf97a57b6f6199fa95a8\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_938b5778e2b4ed8996d673ccae\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
