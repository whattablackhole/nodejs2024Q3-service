/*
  Warnings:

  - A unique constraint covering the columns `[jwtId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jwtId` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "jwtId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_jwtId_key" ON "RefreshToken"("jwtId");
