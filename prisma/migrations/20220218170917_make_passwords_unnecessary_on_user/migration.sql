-- AlterTable
ALTER TABLE "User" ALTER COLUMN "auth_string" DROP NOT NULL,
ALTER COLUMN "passwordhash" DROP NOT NULL,
ALTER COLUMN "salt" DROP NOT NULL;
