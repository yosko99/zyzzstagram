-- AlterTable
ALTER TABLE "User" ALTER COLUMN "imageURL" DROP NOT NULL,
ALTER COLUMN "imageURL" SET DEFAULT 'no-image.png';
