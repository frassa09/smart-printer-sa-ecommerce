FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Recebe a URL do backend durante a compilação
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ETAPA 2: Servidor Web Nginx (Leve e performático)
FROM nginx:alpine

# Copia os estáticos compilados para a pasta padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]