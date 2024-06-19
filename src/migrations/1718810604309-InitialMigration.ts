import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1718810604309 implements MigrationInterface {
    name = 'InitialMigration1718810604309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "receivers" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_58db3b9ea40bf111b785247ea24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" SERIAL NOT NULL, "send_date" date NOT NULL, "send_hour" TIME NOT NULL, "status" character varying(50) NOT NULL, "error" text, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "senders" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "alias" character varying(255) NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_398b8614004a406acf982651b46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "email_classifications" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24b65db1e60127d09ee3732aca6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emails" ("id" SERIAL NOT NULL, "title" character varying(255), "body" text, "image" bytea, "html_file" bytea, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a54dcebef8d05dca7e839749571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "status" boolean NOT NULL DEFAULT true, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campaigns" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "type" character varying(50) NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campaign_receivers" ("id" SERIAL NOT NULL, CONSTRAINT "PK_dda664c64c77a8bb535da885bed" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "campaign_receivers"`);
        await queryRunner.query(`DROP TABLE "campaigns"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "emails"`);
        await queryRunner.query(`DROP TABLE "email_classifications"`);
        await queryRunner.query(`DROP TABLE "senders"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "receivers"`);
    }

}
