-- DropForeignKey
ALTER TABLE `alunoturmas` DROP FOREIGN KEY `alunoturmas_alunoId_fkey`;

-- DropForeignKey
ALTER TABLE `alunoturmas` DROP FOREIGN KEY `alunoturmas_turmaId_fkey`;

-- DropForeignKey
ALTER TABLE `aulas` DROP FOREIGN KEY `aulas_turmaId_fkey`;

-- DropForeignKey
ALTER TABLE `chamadas` DROP FOREIGN KEY `chamadas_alunoTurmaId_fkey`;

-- DropForeignKey
ALTER TABLE `notas` DROP FOREIGN KEY `notas_alunoTurmaId_fkey`;

-- DropForeignKey
ALTER TABLE `provas` DROP FOREIGN KEY `provas_turmaId_fkey`;

-- AddForeignKey
ALTER TABLE `alunoturmas` ADD CONSTRAINT `alunoturmas_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `turmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alunoturmas` ADD CONSTRAINT `alunoturmas_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aulas` ADD CONSTRAINT `aulas_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `turmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `provas` ADD CONSTRAINT `provas_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `turmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chamadas` ADD CONSTRAINT `chamadas_alunoTurmaId_fkey` FOREIGN KEY (`alunoTurmaId`) REFERENCES `alunoturmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_alunoTurmaId_fkey` FOREIGN KEY (`alunoTurmaId`) REFERENCES `alunoturmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
