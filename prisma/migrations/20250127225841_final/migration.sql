/*
  Warnings:

  - You are about to drop the `trainer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `turno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "turno" DROP CONSTRAINT "turno_dni_fkey";

-- DropForeignKey
ALTER TABLE "turno" DROP CONSTRAINT "turno_entrenadorId_fkey";

-- DropTable
DROP TABLE "trainer";

-- DropTable
DROP TABLE "turno";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Users" (
    "dni" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "cellphone" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("dni")
);

-- CreateTable
CREATE TABLE "Turn" (
    "id" SERIAL NOT NULL,
    "dni" INTEGER NOT NULL,
    "activity" TEXT NOT NULL,
    "trainerId" INTEGER NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "timesPerWeek" INTEGER NOT NULL,

    CONSTRAINT "Turn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainer" (
    "dni" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "Trainer_pkey" PRIMARY KEY ("dni")
);

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_dni_fkey" FOREIGN KEY ("dni") REFERENCES "Users"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;
