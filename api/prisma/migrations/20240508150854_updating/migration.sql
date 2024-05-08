/*
  Warnings:

  - You are about to alter the column `budget` on the `Advertiser` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `budget` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Advertiser" ALTER COLUMN "budget" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "budget" SET DATA TYPE DECIMAL(65,30);
