import { Aluno } from '../entities/aluno';
import { IDaoBase } from './IDaoBase';
import { query } from '../database/connection';

export class AlunoDAO implements IDaoBase<Aluno> {
    async create(aluno: Aluno): Promise<void> {
        const sql = 'INSERT INTO alunos (id, nome) VALUES ($1, $2)';
        await query(sql, [aluno.id, aluno.nome]);
    }

    async read(id: number): Promise<Aluno | null> {
        const result = await query('SELECT * FROM alunos WHERE id = $1', [id]);
        if (result.rows.length) {
            const { id, nome } = result.rows[0];
            return new Aluno(id, nome);
        }
        return null;
    }

    async update(aluno: Aluno): Promise<void> {
        const sql = 'UPDATE alunos SET nome = $1 WHERE id = $2';
        await query(sql, [aluno.nome, aluno.id]);
    }

    async delete(id: number): Promise<void> {
        const sql = 'DELETE FROM alunos WHERE id = $1';
        await query(sql, [id]);
    }

    async findAll(): Promise<Aluno[]> {
        const result = await query('SELECT * FROM alunos');
        return result.rows.map((row: any) => new Aluno(row.id, row.nome));
    }
}