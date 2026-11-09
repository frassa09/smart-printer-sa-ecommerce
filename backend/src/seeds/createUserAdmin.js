import 'dotenv/config';
import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import sequelize from '../database/init.js';

export const seedAdmin = async () => {
  try {
    // Conecta/sincroniza o banco de dados se necessário
    await sequelize.authenticate();

    const adminEmail = process.env.ADMIN_EMAIL ;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // 1. Verifica se o Admin já existe para evitar duplicidade
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });

    if (existingAdmin) {
      console.log('⚡ Usuário ADMIN já existe no banco.');
      return;
    }

    // 2. Criptografa a senha do Admin
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // 3. Cria o usuário ADMIN com isActive = true
    await User.create({
      name: 'Administrador',
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true, // ADMIN nasce ativado
    });

    console.log('✅ Usuário ADMIN criado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao rodar o seed do ADMIN:', error);
  }
};

// Executa o seed diretamente se o arquivo for chamado via terminal
seedAdmin().then(() => process.exit());