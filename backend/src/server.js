import 'dotenv/config'
import express from 'express'
import { sequelize } from './database/init.js'
import { corsConfig } from './middlewares/cors.config.js'
import authRoutes from './routes/authRoutes.js';
import './models/relations.js'
import userRoutes from './routes/userRoutes.js'


const app = express()

app.use(corsConfig)
app.use(express.json())

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const port = process.env.SERVER_PORT

app.get('/', (req, res) => {
    return res.json({
        message: 'Aplicação no ar'
    })
})


await sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Aplicação rodando em http://localhost:${port}`))
})