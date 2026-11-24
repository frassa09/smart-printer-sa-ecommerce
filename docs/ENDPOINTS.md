# Documentação de Endpoints da API

* **Base URL:** `http://localhost:3000`
* **Autenticação:** Rotas protegidas exigem o header `Authorization: Bearer <token>`.

---

## 1. Autenticação

| Método | Endpoint | Acesso | Body (JSON) | Respostas |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Público | `{ "name": "string", "email": "string", "password": "string" }` | `201` Usuário criado (`CLIENT`)<br>`400` E-mail já cadastrado |
| `POST` | `/auth/login` | Público | `{ "email": "string", "password": "string" }` | `200` `{ token, user: { id, name, email, role, isActive } }`<br>`401` Credenciais inválidas |

---

## 2. Cardápio

| Método | Endpoint | Acesso | Body (JSON) | Respostas |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/cardapio` | Público | — | `200` Array de `MenuItem` |
| `POST` | `/cardapio/admin` | `ADMIN` ou `EMPLOYEE` ativo | `{ "title": "string", "description": "string", "price": 49.90, "category": "ENTRADA \| PRATO_PRINCIPAL \| SOBREMESA", "available": true }` | `201` Prato criado<br>`400` Campos obrigatórios ausentes<br>`401` / `403` Não autorizado |
| `PUT` | `/cardapio/admin/:id` | `ADMIN` ou `EMPLOYEE` ativo | `{ "title"?: "string", "description"?: "string", "price"?: 55.00, "category"?: "string", "available"?: false }` | `200` Prato atualizado<br>`404` Prato não encontrado |

---

## 3. Usuários e Equipe

> Todas as rotas abaixo exigem `ADMIN`.

| Método | Endpoint | Acesso | Body (JSON) | Respostas |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/users/employees` | `ADMIN` | — | `200` Lista de usuários com `role: EMPLOYEE` |
| `PATCH` | `/users/employees/promote` | `ADMIN` | `{ "email": "funcionario@email.com" }` | `200` Promove `CLIENT` para `EMPLOYEE` ativo<br>`404` E-mail não encontrado |
| `PUT` | `/users/employees/:id/activate` | `ADMIN` | `{ "isActive": true }` | `200` Ativa ou desativa o funcionário<br>`404` Funcionário não encontrado |
| `PATCH` | `/users/employees/:id/role` | `ADMIN` | `{ "role": "EMPLOYEE \| CLIENT \| ADMIN" }` | `200` Perfil atualizado<br>`400` Role inválido |

---

## 4. Telas do Front-end (React Router)

| Rota | Tela | Acesso | Endpoints utilizados |
| :--- | :--- | :--- | :--- |
| `/` | `Reservas` | Público | — |
| `/cardapio` | `Cardapio` | Público (filtra `available !== false`) | `GET /cardapio` |
| `/cardapio/admin` | `AdminCardapio` | `ADMIN` ou `EMPLOYEE` ativo | `GET /cardapio`, `POST /cardapio/admin`, `PUT /cardapio/admin/:id` |
| `/employees` | `AdminUsers` | `ADMIN` | `GET /users/employees`, `PATCH /users/employees/promote`, `PUT /users/employees/:id/activate` |