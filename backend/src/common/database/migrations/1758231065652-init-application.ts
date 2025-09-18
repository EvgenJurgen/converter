import { MigrationInterface, QueryRunner } from "typeorm";

export class InitApplication1758231065652 implements MigrationInterface {
    name = 'InitApplication1758231065652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "currency" ("id" SERIAL NOT NULL, "externalId" smallint NOT NULL, "code" character varying(3) NOT NULL, "name" character varying(255) NOT NULL, "dateStart" TIMESTAMP NOT NULL, "dateEnd" TIMESTAMP NOT NULL, "fetchedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_9ddf17dc93b9c2a9943cb22003d" UNIQUE ("externalId"), CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rate" ("id" SERIAL NOT NULL, "rate" numeric(10,4) NOT NULL, "scale" integer NOT NULL, "fetchedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "currencyId" integer, CONSTRAINT "PK_2618d0d38af322d152ccc328f33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_da956efbe90b96bcd96a7e42ff" ON "rate" ("fetchedAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6e7bf1a386b3b7ff97add73fb2" ON "rate" ("currencyId", "fetchedAt") `);
        await queryRunner.query(`ALTER TABLE "rate" ADD CONSTRAINT "FK_83871f21809c97ac33dcc30e3fb" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rate" DROP CONSTRAINT "FK_83871f21809c97ac33dcc30e3fb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6e7bf1a386b3b7ff97add73fb2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da956efbe90b96bcd96a7e42ff"`);
        await queryRunner.query(`DROP TABLE "rate"`);
        await queryRunner.query(`DROP TABLE "currency"`);
    }

}
