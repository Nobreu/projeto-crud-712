import express from 'express'
import path from 'path'
import session from 'express-session'
import alunosRouter from './routers/alunoRoute.js'
import authRouter from './routers/authRoute.js'
import { requireAuth, redirectIfLoggedIn } from './middleware/authMiddleware.js'
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

// Configuração de sessão
app.use(session({
    secret: 'sua-chave-secreta-aqui-mude-em-producao',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Em produção com HTTPS, mude para true
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}))

// Middleware para disponibilizar dados do usuário em todas as views
app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null
    next()
})

// Rotas de autenticação (sem proteção)
app.use('/', authRouter)

// Proteger rotas de alunos
app.use('/', requireAuth, alunosRouter)

// Rota raiz redireciona para login ou alunos
app.get('/', (req, res) => {
    if (req.session.usuario) {
        res.redirect('/alunos')
    } else {
        res.redirect('/login')
    }
})

app.listen(3000, () => console.log('Servidor ON - http://localhost:3000'))