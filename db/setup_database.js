import pool from './connection.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
    try {
        console.log('🔧 Configurando banco de dados...');
        
        // 1. Criar tabela de usuários
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                tipo_usuario ENUM('admin', 'usuario') DEFAULT 'usuario',
                status ENUM('ativo', 'inativo') DEFAULT 'ativo',
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        
        await pool.query(createTableSQL);
        console.log('✅ Tabela de usuários criada!');
        
        // 2. Verificar se usuário admin já existe
        const [existingUsers] = await pool.query(
            "SELECT id_usuario FROM usuarios WHERE email = ?", 
            ['admin@admin.com']
        );
        
        if (existingUsers.length === 0) {
            // 3. Inserir usuário administrador padrão
            const insertAdminSQL = `
                INSERT INTO usuarios (nome, email, senha, tipo_usuario, status) 
                VALUES (?, ?, ?, ?, ?)
            `;
            
            const adminPassword = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // admin123
            
            await pool.query(insertAdminSQL, [
                'Administrador',
                'admin@admin.com', 
                adminPassword,
                'admin',
                'ativo'
            ]);
            
            console.log('👤 Usuário administrador criado!');
        } else {
            console.log('ℹ️  Usuário administrador já existe!');
        }
        
        console.log('');
        console.log('🚀 Sistema pronto para uso!');
        console.log('📧 Email: admin@admin.com');
        console.log('🔑 Senha: admin123');
        
    } catch (error) {
        console.error('❌ Erro ao configurar banco de dados:', error.message);
        throw error;
    } finally {
        // Fechar conexão
        await pool.end();
    }
}

// Executar setup
setupDatabase().catch(console.error);
