/*
  Warnings:

  - You are about to drop the column `fecha` on the `turno` table. All the data in the column will be lost.
  - You are about to drop the `deportes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `franja_horaria` to the `turno` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "turno" DROP CONSTRAINT "turno_deporteId_fkey";

-- AlterTable
ALTER TABLE "turno" DROP COLUMN "fecha",
ADD COLUMN     "franja_horaria" TEXT NOT NULL;

-- DropTable
DROP TABLE "deportes";
