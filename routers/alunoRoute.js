import express from 'express'
import {listarAlunos, criarAluno, editarAluno, deletarAluno, buscarAlunoPorId} from '../controllers/alunoController.js'

const alunosRouter = express.Router()

// Listar todos os alunos
alunosRouter.get('/alunos', async (req, res) => {
    try {
        const alunos = await listarAlunos()
        res.render('alunos', {alunos, req})
    }
    catch (err) {
        console.error(err)
        res.status(500).send('Erro ao listar alunos')
    }
})

// Mostrar formulário para criar novo aluno
alunosRouter.get('/alunos/novo', (req, res) => {
    res.render('formulario-aluno', { aluno: null, titulo: 'Novo Aluno' })
})

// Criar novo aluno
alunosRouter.post('/alunos', async (req, res) => {
    try {
        const resultado = await criarAluno(req, res)
        res.redirect('/alunos?sucesso=Aluno criado com sucesso!')
    }
    catch (err) {
        console.error(err)
        res.status(500).render('formulario-aluno', { 
            aluno: req.body, 
            titulo: 'Novo Aluno',
            erro: 'Erro ao criar aluno: ' + err.message 
        })
    }
})

// Mostrar formulário para editar aluno
alunosRouter.get('/alunos/:id/editar', async (req, res) => {
    try {
        const aluno = await buscarAlunoPorId(req, res)
        res.render('formulario-aluno', { aluno, titulo: 'Editar Aluno' })
    }
    catch (err) {
        console.error(err)
        res.status(404).send('Aluno não encontrado')
    }
})

// Atualizar aluno
alunosRouter.post('/alunos/:id', async (req, res) => {
    try {
        const resultado = await editarAluno(req, res)
        res.redirect('/alunos?sucesso=Aluno atualizado com sucesso!')
    }
    catch (err) {
        console.error(err)
        res.status(500).render('formulario-aluno', { 
            aluno: req.body, 
            titulo: 'Editar Aluno',
            erro: 'Erro ao atualizar aluno: ' + err.message 
        })
    }
})

// Deletar aluno
alunosRouter.post('/alunos/:id/deletar', async (req, res) => {
    try {
        const resultado = await deletarAluno(req, res)
        res.redirect('/alunos?sucesso=Aluno deletado com sucesso!')
    }
    catch (err) {
        console.error(err)
        res.status(500).redirect('/alunos?erro=Erro ao deletar aluno: ' + err.message)
    }
})

export default alunosRouter