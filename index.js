import express from 'express'
import path from 'path'
import alunosRouter from './routers/alunoRoute.js'
import { fileURLToPath } from 'url'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configurações do Express
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"))

// Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Rotas
app.use('/', alunosRouter)

// Rota raiz redireciona para alunos
app.get('/', (req, res) => {
    res.redirect('/alunos')
})

app.listen(3000, () => console.log('Servidor ON - http://localhost:3000'))