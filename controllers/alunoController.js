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