import cors from 'cors'

export const corsConfig = cors({
    allowedHeaders: ['Authorization'],
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'HEAD','PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: '*',
})