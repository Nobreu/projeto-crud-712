import express from 'express'
import {listarAlunos} from '../controllers/alunoController.js'

const alunosRouter = express.Router()

alunosRouter.get('/alunos', async (req, res) => {
    try {
        const alunos = await listarAlunos()
        res.render('alunos', {alunos})
    }
    catch (err) {
        console.error(err)
        res.status(500).send('Erro ao listar lunos')
    }
})

export default alunosRouter