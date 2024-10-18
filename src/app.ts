import readlineSync from 'readline-sync';
import { AlunoDAO } from './dao/AlunoDAO';
import { Aluno } from './entities/aluno';

async function main() {
    const alunoDAO = new AlunoDAO();

    const id = parseInt(readlineSync.question('Digite o ID do aluno: '), 10);
    const nome = readlineSync.question('Digite o nome do aluno: ');

    const aluno = new Aluno(id, nome);

    await alunoDAO.create(aluno);

    console.log('Aluno salvo com sucesso no PostgreSQL!');
}

main().catch(console.error);