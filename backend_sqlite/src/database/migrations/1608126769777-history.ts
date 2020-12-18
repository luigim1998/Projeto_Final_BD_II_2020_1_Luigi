import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class history1608126769777 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'history',
            columns:[
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'userid',
                    type: 'integers',
                },
                {
                    name: 'username',
                    type: 'varchar',
                },
                {
                    name: 'time',
                    type: 'varchar',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('history');
    }

}
