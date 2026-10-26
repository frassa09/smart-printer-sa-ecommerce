import cors from 'cors'

export const corsConfig = cors({
    allowedHeaders: ['Authorization'],
    methods: ['POST', 'GET', 'PATCH', 'DELETE'],
    origin: 'http://localhost:*'
})