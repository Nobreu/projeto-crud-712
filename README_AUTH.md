# 🔐 Sistema de Autenticação - CRUD de Alunos

## 📋 O que foi implementado

### ✅ Funcionalidades Adicionadas
- **Sistema de Login/Logout** completo
- **Página de login** moderna e responsiva
- **Middleware de autenticação** para proteger rotas
- **Sessões** para manter usuário logado
- **Criptografia de senhas** com bcrypt
- **Criação de usuários** (para desenvolvimento)
- **Proteção de rotas** - só usuários logados podem acessar

### 🗄️ Banco de Dados
- **Tabela `usuarios`** criada automaticamente
- **Usuário administrador padrão** já configurado
- **Hash de senhas** seguro

## 🚀 Como usar

### 1. Configurar Banco de Dados
Execute o script para criar a tabela de usuários:
```bash
node db/setup_database.js
```

### 2. Iniciar o Sistema
```bash
node index.js
```

### 3. Acessar o Sistema
- **URL:** http://localhost:3000
- **Redirecionamento automático** para login se não estiver autenticado

### 4. Credenciais Padrão
- **Email:** admin@admin.com
- **Senha:** admin123

## 🔧 Estrutura Criada

```
├── controllers/
│   └── authController.js          # Controlador de autenticação
├── middleware/
│   └── authMiddleware.js          # Middlewares de proteção
├── routers/
│   └── authRoute.js              # Rotas de autenticação
├── views/
│   ├── login.ejs                 # Página de login
│   └── criar-usuario.ejs         # Página para criar usuários
├── db/
│   ├── create_users_table.sql    # Script SQL da tabela
│   └── setup_database.js         # Script de configuração
└── index.js                      # Aplicação principal atualizada
```

## 🛡️ Segurança Implementada

- **Senhas criptografadas** com bcrypt
- **Sessões seguras** com express-session
- **Middleware de proteção** em todas as rotas
- **Validação de entrada** nos formulários
- **Redirecionamento automático** para login

## 📱 Interface

- **Design moderno** com Bootstrap
- **Responsivo** para mobile
- **Feedback visual** para erros e sucessos
- **Navegação intuitiva** com botões de logout

## 🔄 Fluxo de Autenticação

1. **Usuário acessa** qualquer rota protegida
2. **Sistema verifica** se está logado
3. **Se não estiver** → redireciona para `/login`
4. **Após login** → redireciona para `/alunos`
5. **Logout** → destroi sessão e volta para login

## 🎯 Próximos Passos

- [ ] Implementar recuperação de senha
- [ ] Adicionar permissões por tipo de usuário
- [ ] Implementar "Lembrar-me"
- [ ] Adicionar validação de força da senha
- [ ] Implementar logs de auditoria

## 🐛 Solução de Problemas

### Erro de Conexão com Banco
- Verifique as credenciais no arquivo `.env`
- Certifique-se que o MySQL está rodando
- Execute `node db/setup_database.js` para criar a tabela

### Página de Login não Carrega
- Verifique se todas as dependências foram instaladas
- Execute `npm install` novamente se necessário

### Sessão não Persiste
- Verifique se o `express-session` está configurado corretamente
- Em produção, configure uma chave secreta segura
