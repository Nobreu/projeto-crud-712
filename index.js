import express from 'express'
import path from 'path'
import alunosRouter from './routers/alunoRoute.js'
import { fileURLToPath } from 'url'
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', alunosRouter)

app.listen(3000, () => console.log('Sevidor ON'))