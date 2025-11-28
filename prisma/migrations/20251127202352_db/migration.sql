-- CreateTable
CREATE TABLE "Confissao" (
    "id" SERIAL NOT NULL,
    "mensagem" VARCHAR(500),
    "tipoMensagem" VARCHAR(20),
    "remetenteId" INTEGER NOT NULL,
    "destinatarioId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Confissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nomeUsuario" VARCHAR(13) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "senha" VARCHAR(255),
    "anonimo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Confissao" ADD CONSTRAINT "Confissao_remetenteId_fkey" FOREIGN KEY ("remetenteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Confissao" ADD CONSTRAINT "Confissao_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
