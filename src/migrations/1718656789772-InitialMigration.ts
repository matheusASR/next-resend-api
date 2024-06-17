import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1718656789772 implements MigrationInterface {
    name = 'InitialMigration1718656789772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "status" boolean NOT NULL DEFAULT true, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "receivers" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "nome" character varying(255) NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_58db3b9ea40bf111b785247ea24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campanha_receivers" ("id" SERIAL NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "campaignId" integer, "receiverId" integer, CONSTRAINT "PK_3d3ccc1f0957de24ac5a9f630cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campanhas" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "tipo" character varying(50) NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "PK_555b1dc3b81cb8ef0d3887e22b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classificacoes_email" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "campaignId" integer, CONSTRAINT "PK_71375ce29ec81543adb323b529f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "senders" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "alias" character varying(255) NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_398b8614004a406acf982651b46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emails" ("id" SERIAL NOT NULL, "titulo" character varying(255) NOT NULL, "corpo" text NOT NULL, "imagem" bytea, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "classificationId" integer, "senderId" integer, CONSTRAINT "PK_a54dcebef8d05dca7e839749571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agendamentos" ("id" SERIAL NOT NULL, "data_envio" date NOT NULL, "hora_envio" TIME NOT NULL, "status" character varying(50) NOT NULL, "erro" text, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "emailId" integer, "receiverId" integer, CONSTRAINT "PK_3890b7448ebc7efdfd1d43bf0c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "campanha_receivers" ADD CONSTRAINT "FK_41c8b6127767f7f22c6eed6a67b" FOREIGN KEY ("campaignId") REFERENCES "campanhas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campanha_receivers" ADD CONSTRAINT "FK_abb7772aaab7868340a462bbc91" FOREIGN KEY ("receiverId") REFERENCES "receivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campanhas" ADD CONSTRAINT "FK_f20e6f91e08ab83c82a6270e57d" FOREIGN KEY ("clientId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classificacoes_email" ADD CONSTRAINT "FK_dcf15a6551864a4b91868a8c996" FOREIGN KEY ("campaignId") REFERENCES "campanhas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emails" ADD CONSTRAINT "FK_254ec2ceb2eb3922d754dff2e1e" FOREIGN KEY ("classificationId") REFERENCES "classificacoes_email"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emails" ADD CONSTRAINT "FK_7346dd09401c768d4a64d420b7a" FOREIGN KEY ("senderId") REFERENCES "senders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD CONSTRAINT "FK_e0193c3bafe4a83465c55dce5b0" FOREIGN KEY ("emailId") REFERENCES "emails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD CONSTRAINT "FK_34ec36af2ee01d7bbb9720bceb2" FOREIGN KEY ("receiverId") REFERENCES "receivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP CONSTRAINT "FK_34ec36af2ee01d7bbb9720bceb2"`);
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP CONSTRAINT "FK_e0193c3bafe4a83465c55dce5b0"`);
        await queryRunner.query(`ALTER TABLE "emails" DROP CONSTRAINT "FK_7346dd09401c768d4a64d420b7a"`);
        await queryRunner.query(`ALTER TABLE "emails" DROP CONSTRAINT "FK_254ec2ceb2eb3922d754dff2e1e"`);
        await queryRunner.query(`ALTER TABLE "classificacoes_email" DROP CONSTRAINT "FK_dcf15a6551864a4b91868a8c996"`);
        await queryRunner.query(`ALTER TABLE "campanhas" DROP CONSTRAINT "FK_f20e6f91e08ab83c82a6270e57d"`);
        await queryRunner.query(`ALTER TABLE "campanha_receivers" DROP CONSTRAINT "FK_abb7772aaab7868340a462bbc91"`);
        await queryRunner.query(`ALTER TABLE "campanha_receivers" DROP CONSTRAINT "FK_41c8b6127767f7f22c6eed6a67b"`);
        await queryRunner.query(`DROP TABLE "agendamentos"`);
        await queryRunner.query(`DROP TABLE "emails"`);
        await queryRunner.query(`DROP TABLE "senders"`);
        await queryRunner.query(`DROP TABLE "classificacoes_email"`);
        await queryRunner.query(`DROP TABLE "campanhas"`);
        await queryRunner.query(`DROP TABLE "campanha_receivers"`);
        await queryRunner.query(`DROP TABLE "receivers"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
    }

}
