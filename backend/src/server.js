import 'dotenv/config'
import express from 'express'
import { sequelize } from './database/init.js'
import { corsConfig } from './middlewares/cors.config.js'
import authRoutes from './routes/authRoutes.js';


const app = express()

app.use(corsConfig)
app.use(express.json())

app.use('/auth', authRoutes);

const port = process.env.SERVER_PORT

app.get('/', (req, res) => {
    return res.json({
        message: 'Aplicação no ar'
    })
})


async function iniciarServidor() {
  try {
    // Testa a conexão com o banco remoto/Neon
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Aplicação rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Não foi possível conectar ao banco de dados:', error);
    process.exit(1);
  }
}

iniciarServidor();