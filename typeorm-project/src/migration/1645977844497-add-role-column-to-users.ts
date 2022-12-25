import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addRoleColumnToUsers1645977844497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const userTable = await queryRunner.getTable("users");
        const roleColumn = new TableColumn({ name: "role", type: "int" });
        await queryRunner.addColumn(userTable, roleColumn);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const userTable = await queryRunner.getTable("users");
        await queryRunner.dropColumn(userTable, "role");
    }

}
