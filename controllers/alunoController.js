import pool from "../db/connection.js";

export const listarAlunos = async (req, res) => {
    try {
        const sql = "select * from aluno"
        const [alunos] = await pool.query(sql)

        return alunos
    }
    catch(err){
        console.error('erro ao listar alunos:', err)
            throw err
    }
}

export const criarAluno = async (req, res) => {
    try {
        const { nome, foto, data_nascimento, contato_responsavel, faixa, graus, peso, altura, tipo_sanguineo, plano_saude, alergias, observacoes_medicas, status } = req.body;
        
        const sql = `INSERT INTO aluno (nome, foto, data_nascimento, contato_responsavel, faixa, graus, peso, altura, tipo_sanguineo, plano_saude, alergias, observacoes_medicas, status) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const [result] = await pool.query(sql, [nome, foto, data_nascimento, contato_responsavel, faixa, graus, peso, altura, tipo_sanguineo, plano_saude, alergias, observacoes_medicas, status || 'ativo']);
        
        return { id: result.insertId, message: 'Aluno criado com sucesso!' };
    }
    catch(err) {
        console.error('erro ao criar aluno:', err);
        throw err;
    }
}

export const editarAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, foto, data_nascimento, contato_responsavel, faixa, graus, peso, altura, tipo_sanguineo, plano_saude, alergias, observacoes_medicas, status } = req.body;
        
        const sql = `UPDATE aluno SET nome = ?, foto = ?, data_nascimento = ?, contato_responsavel = ?, faixa = ?, graus = ?, peso = ?, altura = ?, tipo_sanguineo = ?, plano_saude = ?, alergias = ?, observacoes_medicas = ?, status = ? 
                     WHERE id_aluno = ?`;
        
        const [result] = await pool.query(sql, [nome, foto, data_nascimento, contato_responsavel, faixa, graus, peso, altura, tipo_sanguineo, plano_saude, alergias, observacoes_medicas, status, id]);
        
        if (result.affectedRows === 0) {
            throw new Error('Aluno não encontrado');
        }
        
        return { message: 'Aluno atualizado com sucesso!' };
    }
    catch(err) {
        console.error('erro ao editar aluno:', err);
        throw err;
    }
}

export const deletarAluno = async (req, res) => {
    try {
        const { id } = req.params;
        
        const sql = "DELETE FROM aluno WHERE id_aluno = ?";
        const [result] = await pool.query(sql, [id]);
        
        if (result.affectedRows === 0) {
            throw new Error('Aluno não encontrado');
        }
        
        return { message: 'Aluno deletado com sucesso!' };
    }
    catch(err) {
        console.error('erro ao deletar aluno:', err);
        throw err;
    }
}

export const buscarAlunoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        
        const sql = "SELECT * FROM aluno WHERE id_aluno = ?";
        const [alunos] = await pool.query(sql, [id]);
        
        if (alunos.length === 0) {
            throw new Error('Aluno não encontrado');
        }
        
        return alunos[0];
    }
    catch(err) {
        console.error('erro ao buscar aluno:', err);
        throw err;
    }
}