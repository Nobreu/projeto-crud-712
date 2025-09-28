import pool from "../db/connection.js";
import bcrypt from 'bcryptjs';

// Função para fazer login
export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Buscar usuário pelo email
        const sql = "SELECT * FROM usuarios WHERE email = ? AND status = 'ativo'";
        const [usuarios] = await pool.query(sql, [email]);

        if (usuarios.length === 0) {
            return res.render('login', { 
                erro: 'Email ou senha incorretos',
                email: email 
            });
        }

        const usuario = usuarios[0];

        // Verificar senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        
        if (!senhaValida) {
            return res.render('login', { 
                erro: 'Email ou senha incorretos',
                email: email 
            });
        }

        // Criar sessão
        req.session.usuario = {
            id: usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email,
            tipo_usuario: usuario.tipo_usuario
        };

        res.redirect('/alunos');
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.render('login', { 
            erro: 'Erro interno do servidor. Tente novamente.',
            email: req.body.email 
        });
    }
};

// Função para fazer logout
export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
            return res.redirect('/alunos');
        }
        res.redirect('/login');
    });
};

// Função para mostrar página de login
export const showLogin = (req, res) => {
    // Se já estiver logado, redirecionar para alunos
    if (req.session.usuario) {
        return res.redirect('/alunos');
    }
    
    res.render('login', { erro: null, email: '' });
};

// Função para criar novo usuário (apenas para desenvolvimento)
export const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, tipo_usuario = 'usuario' } = req.body;

        // Verificar se email já existe
        const sqlCheck = "SELECT id_usuario FROM usuarios WHERE email = ?";
        const [existingUsers] = await pool.query(sqlCheck, [email]);

        if (existingUsers.length > 0) {
            return res.render('criar-usuario', { 
                erro: 'Email já cadastrado',
                dados: req.body 
            });
        }

        // Hash da senha
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);

        // Inserir usuário
        const sql = `INSERT INTO usuarios (nome, email, senha, tipo_usuario, status) 
                     VALUES (?, ?, ?, ?, 'ativo')`;
        
        await pool.query(sql, [nome, email, senhaHash, tipo_usuario]);

        res.redirect('/login?sucesso=Usuário criado com sucesso!');
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        res.render('criar-usuario', { 
            erro: 'Erro interno do servidor. Tente novamente.',
            dados: req.body 
        });
    }
};

// Função para mostrar página de criar usuário
export const showCriarUsuario = (req, res) => {
    res.render('criar-usuario', { erro: null, dados: {} });
};
