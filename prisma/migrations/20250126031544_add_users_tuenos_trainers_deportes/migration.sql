-- CreateTable
CREATE TABLE "users" (
    "dni" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "clase" TEXT NOT NULL,
    "genero" BOOLEAN NOT NULL,
    "edad" INTEGER NOT NULL,
    "n_telefono" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("dni")
);

-- CreateTable
CREATE TABLE "turno" (
    "id" SERIAL NOT NULL,
    "dni" INTEGER NOT NULL,
    "clase" TEXT NOT NULL,
    "entrenadorId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "deporteId" INTEGER NOT NULL,

    CONSTRAINT "turno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainer" (
    "dni" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "clase" TEXT NOT NULL,
    "franja" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "genero" BOOLEAN NOT NULL,

    CONSTRAINT "trainer_pkey" PRIMARY KEY ("dni")
);

-- CreateTable
CREATE TABLE "deportes" (
    "id" INTEGER NOT NULL,
    "actividad" INTEGER NOT NULL,
    "horario" TEXT NOT NULL,

    CONSTRAINT "deportes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "turno" ADD CONSTRAINT "turno_dni_fkey" FOREIGN KEY ("dni") REFERENCES "users"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turno" ADD CONSTRAINT "turno_entrenadorId_fkey" FOREIGN KEY ("entrenadorId") REFERENCES "trainer"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turno" ADD CONSTRAINT "turno_deporteId_fkey" FOREIGN KEY ("deporteId") REFERENCES "deportes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
