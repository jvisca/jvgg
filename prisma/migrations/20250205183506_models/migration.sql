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
    "userDni" INTEGER NOT NULL,
    "activity" TEXT NOT NULL,
    "trainerDni" INTEGER NOT NULL,
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
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_trainerDni_fkey" FOREIGN KEY ("trainerDni") REFERENCES "Trainer"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_userDni_fkey" FOREIGN KEY ("userDni") REFERENCES "Users"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;
