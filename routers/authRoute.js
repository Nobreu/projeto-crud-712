import express from 'express';
import { login, logout, showLogin, criarUsuario, showCriarUsuario } from '../controllers/authController.js';

const authRouter = express.Router();

// Página de login
authRouter.get('/login', showLogin);

// Processar login
authRouter.post('/login', login);

// Logout
authRouter.get('/logout', logout);

// Página para criar usuário (apenas para desenvolvimento)
authRouter.get('/criar-usuario', showCriarUsuario);

// Processar criação de usuário
authRouter.post('/criar-usuario', criarUsuario);

export default authRouter;
