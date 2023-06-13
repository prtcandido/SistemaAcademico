import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const professor = await prisma.professor.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      nome: 'Professor Nome',
      lattes: 'Professor Lattes',
      telefone: 'Professor Telefone',
      email: 'Professor Email',
    },
  });

  const curso = await prisma.curso.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      nome: 'Curso Nome',
      descricao: 'Curso Descrição',
      professorId: 1,
    },
  });

  const disciplina = await prisma.disciplina.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      nome: 'Disciplina Nome',
      ementa: 'Disciplina Ementa',
      cargaHoraria: 1,
    },
  });

  const salaaula = await prisma.salaAula.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      tipo: 'Sala Aula Tipo',
      temProjetor: true,
      bloco: '1',
      quantidadeCadeiras: 1,
      quantidadeComputadores: 1,
    },
  });

  const semestre = await prisma.semestre.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      descricao: 'Semestre Descrição',
      sigla: '20231',
    },
  });

  const turma = await prisma.turma.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      cursoId: 1,
      salaAulaId: 1,
      professorId: 1,
      disciplinaId: 1,
      semestreId: 1,
    },
  });

  const aula = await prisma.aula.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      conteudoProgramatico: 'Aula Conteúdo Programático',
      dataProgramada: new Date('01/01/2023'),
      tecnicaMetodologica: 'Aula Técnica Metodológica',
      turmaId: 1,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
