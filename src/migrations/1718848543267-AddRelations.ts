import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelations1718848543267 implements MigrationInterface {
    name = 'AddRelations1718848543267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaign_receivers" ADD "campaignId" integer`);
        await queryRunner.query(`ALTER TABLE "campaign_receivers" ADD "receiverId" integer`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "clientId" integer`);
        await queryRunner.query(`ALTER TABLE "email_classifications" ADD "campaignId" integer`);
        await queryRunner.query(`ALTER TABLE "emails" ADD "classificationId" integer`);
        await queryRunner.query(`ALTER TABLE "emails" ADD "senderId" integer`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "emailId" integer`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "receiverId" integer`);
        await queryRunner.query(`ALTER TABLE "campaign_receivers" ADD CONSTRAINT "FK_4f4233a07d61cee36a18b298d4a" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaign_receivers" ADD CONSTRAINT "FK_4033c19d70643df2dc6455ea375" FOREIGN KEY ("receiverId") REFERENCES "receivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_e61692e4fb96f6444339a1485e1" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "email_classifications" ADD CONSTRAINT "FK_d556425d0b1a846b64aaa7814db" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emails" ADD CONSTRAINT "FK_254ec2ceb2eb3922d754dff2e1e" FOREIGN KEY ("classificationId") REFERENCES "email_classifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emails" ADD CONSTRAINT "FK_7346dd09401c768d4a64d420b7a" FOREIGN KEY ("senderId") REFERENCES "senders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_5d3d74bf8f1cfd954443b97d934" FOREIGN KEY ("emailId") REFERENCES "emails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_88deabec351e5c056342704c44d" FOREIGN KEY ("receiverId") REFERENCES "receivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_88deabec351e5c056342704c44d"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_5d3d74bf8f1cfd954443b97d934"`);
        await queryRunner.query(`ALTER TABLE "emails" DROP CONSTRAINT "FK_7346dd09401c768d4a64d420b7a"`);
        await queryRunner.query(`ALTER TABLE "emails" DROP CONSTRAINT "FK_254ec2ceb2eb3922d754dff2e1e"`);
        await queryRunner.query(`ALTER TABLE "email_classifications" DROP CONSTRAINT "FK_d556425d0b1a846b64aaa7814db"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_e61692e4fb96f6444339a1485e1"`);
        await queryRunner.query(`ALTER TABLE "campaign_receivers" DROP CONSTRAINT "FK_4033c19d70643df2dc6455ea375"`);
        await queryRunner.query(`ALTER TABLE "campaign_receivers" DROP CONSTRAINT "FK_4f4233a07d61cee36a18b298d4a"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "receiverId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "emailId"`);
        await queryRunner.query(`ALTER TABLE "emails" DROP COLUMN "senderId"`);
        await queryRunner.query(`ALTER TABLE "emails" DROP COLUMN "classificationId"`);
        await queryRunner.query(`ALTER TABLE "email_classifications" DROP COLUMN "campaignId"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "campaign_receivers" DROP COLUMN "receiverId"`);
        await queryRunner.query(`ALTER TABLE "campaign_receivers" DROP COLUMN "campaignId"`);
    }

}
