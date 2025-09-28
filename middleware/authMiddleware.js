// Middleware para verificar se o usuário está autenticado
export const requireAuth = (req, res, next) => {
    if (req.session && req.session.usuario) {
        // Usuário está logado, continuar
        return next();
    } else {
        // Usuário não está logado, redirecionar para login
        return res.redirect('/login');
    }
};

// Middleware para verificar se o usuário é administrador
export const requireAdmin = (req, res, next) => {
    if (req.session && req.session.usuario && req.session.usuario.tipo_usuario === 'admin') {
        // Usuário é admin, continuar
        return next();
    } else {
        // Usuário não é admin, redirecionar para alunos
        return res.redirect('/alunos');
    }
};

// Middleware para verificar se o usuário já está logado (usado na página de login)
export const redirectIfLoggedIn = (req, res, next) => {
    if (req.session && req.session.usuario) {
        // Usuário já está logado, redirecionar para alunos
        return res.redirect('/alunos');
    } else {
        // Usuário não está logado, continuar
        return next();
    }
};
