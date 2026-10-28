import cors from 'cors'

export const corsConfig = cors({
    allowedHeaders: ['Authorization'],
    methods: ['POST', 'GET', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: '*'
})