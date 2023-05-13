-- CreateTable
CREATE TABLE "cursos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" VARCHAR(2000) NOT NULL,
    "professorId" INTEGER NOT NULL,

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professores" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "lattes" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(30) NOT NULL,
    "email" VARCHAR(100) NOT NULL,

    CONSTRAINT "professores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salaaulas" (
    "id" SERIAL NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "temProjetor" BOOLEAN NOT NULL,
    "bloco" VARCHAR(30) NOT NULL,
    "quantidadeCadeiras" INTEGER NOT NULL,
    "quantidadeComputadores" INTEGER NOT NULL,

    CONSTRAINT "salaaulas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplinas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "ementa" VARCHAR(500) NOT NULL,
    "cargaHoraria" INTEGER NOT NULL,

    CONSTRAINT "disciplinas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itembibliografias" (
    "id" SERIAL NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "autores" VARCHAR(200) NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "isbn" VARCHAR(50),
    "disciplinaId" INTEGER NOT NULL,

    CONSTRAINT "itembibliografias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materialidaticos" (
    "id" SERIAL NOT NULL,
    "nomeArquivoOriginal" VARCHAR(100) NOT NULL,
    "nomeArquivoInterno" VARCHAR(100) NOT NULL,
    "autores" VARCHAR(200) NOT NULL,
    "disciplinaId" INTEGER NOT NULL,

    CONSTRAINT "materialidaticos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alunos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "telefone" VARCHAR(30) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "dataNascimento" DATE NOT NULL,

    CONSTRAINT "alunos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitacao" (
    "id" SERIAL NOT NULL,
    "assunto" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(1000) NOT NULL,
    "resposta" VARCHAR(1000),
    "dataAbertura" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataResposta" DATE DEFAULT CURRENT_TIMESTAMP,
    "alunoId" INTEGER NOT NULL,

    CONSTRAINT "Solicitacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semestres" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "sigla" VARCHAR(5) NOT NULL,

    CONSTRAINT "semestres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemcalendarios" (
    "id" SERIAL NOT NULL,
    "periodoDe" DATE NOT NULL,
    "periodoAte" DATE NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,
    "haveraAula" BOOLEAN NOT NULL,
    "semestreId" INTEGER NOT NULL,

    CONSTRAINT "itemcalendarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turmas" (
    "id" SERIAL NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "salaAulaId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    "semestreId" INTEGER NOT NULL,

    CONSTRAINT "turmas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alunoturmas" (
    "id" SERIAL NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "alunoId" INTEGER NOT NULL,

    CONSTRAINT "alunoturmas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aulas" (
    "id" SERIAL NOT NULL,
    "conteudoProgramatico" VARCHAR(200) NOT NULL,
    "dataProgramada" DATE NOT NULL,
    "tecnicaMetodologica" VARCHAR(100) NOT NULL,
    "turmaId" INTEGER NOT NULL,

    CONSTRAINT "aulas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provas" (
    "id" SERIAL NOT NULL,
    "dataProgramada" DATE NOT NULL,
    "tipo" VARCHAR(30) NOT NULL,
    "peso" INTEGER NOT NULL,
    "turmaId" INTEGER NOT NULL,

    CONSTRAINT "provas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chamadas" (
    "id" SERIAL NOT NULL,
    "alunoTurmaId" INTEGER NOT NULL,
    "aulaId" INTEGER NOT NULL,
    "presente" BOOLEAN NOT NULL,

    CONSTRAINT "chamadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notas" (
    "id" SERIAL NOT NULL,
    "alunoTurmaId" INTEGER NOT NULL,
    "provaId" INTEGER NOT NULL,
    "nota" DECIMAL(3,1) NOT NULL,

    CONSTRAINT "notas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "materialidaticos_nomeArquivoInterno_key" ON "materialidaticos"("nomeArquivoInterno");

-- CreateIndex
CREATE UNIQUE INDEX "alunoturmas_turmaId_alunoId_key" ON "alunoturmas"("turmaId", "alunoId");

-- AddForeignKey
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itembibliografias" ADD CONSTRAINT "itembibliografias_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materialidaticos" ADD CONSTRAINT "materialidaticos_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitacao" ADD CONSTRAINT "Solicitacao_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemcalendarios" ADD CONSTRAINT "itemcalendarios_semestreId_fkey" FOREIGN KEY ("semestreId") REFERENCES "semestres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turmas" ADD CONSTRAINT "turmas_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turmas" ADD CONSTRAINT "turmas_salaAulaId_fkey" FOREIGN KEY ("salaAulaId") REFERENCES "salaaulas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turmas" ADD CONSTRAINT "turmas_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turmas" ADD CONSTRAINT "turmas_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turmas" ADD CONSTRAINT "turmas_semestreId_fkey" FOREIGN KEY ("semestreId") REFERENCES "semestres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alunoturmas" ADD CONSTRAINT "alunoturmas_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alunoturmas" ADD CONSTRAINT "alunoturmas_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aulas" ADD CONSTRAINT "aulas_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas" ADD CONSTRAINT "provas_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chamadas" ADD CONSTRAINT "chamadas_alunoTurmaId_fkey" FOREIGN KEY ("alunoTurmaId") REFERENCES "alunoturmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chamadas" ADD CONSTRAINT "chamadas_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "aulas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notas" ADD CONSTRAINT "notas_alunoTurmaId_fkey" FOREIGN KEY ("alunoTurmaId") REFERENCES "alunoturmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notas" ADD CONSTRAINT "notas_provaId_fkey" FOREIGN KEY ("provaId") REFERENCES "provas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
