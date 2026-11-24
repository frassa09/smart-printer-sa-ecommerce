# Regras de Negócio, Models e Permissões (RBAC)

Este documento descreve como funcionam os perfis de acesso, autenticação, regras do cardápio e estrutura de dados do sistema.

---

## 1. Perfis de Usuário (`User.role`) e Status (`isActive`)

O sistema possui três níveis de acesso controlados pelo `role` e pelo booleano `isActive`:

| Perfil (`role`) | `isActive` padrão | O que pode fazer |
| :--- | :--- | :--- |
| **`CLIENT`** | `false` | Visualiza reservas e faz pedidos no cardápio público (`/cardapio`). Não possui acesso a rotas `/admin` ou `/employees`. |
| **`EMPLOYEE`** | `false` (até ativação) | Quando `isActive: true`, acessa `/cardapio/admin` para criar pratos, editar preços e pausar/reativar itens. Se `isActive: false`, é bloqueado pelo middleware `checkRole`. |
| **`ADMIN`** | `true` | Acesso irrestrito: gerencia o cardápio (`/cardapio/admin`) e gerencia a equipe (`/employees`), podendo promover clientes e ativar/desativar funcionários. |

---

## 2. Autenticação e Sessão (JWT + Front-end)

* **Payload do Token JWT:** Assinado no login contendo `{ id, role, isActive }`.
* **Armazenamento no Front-end (`localStorage`):**
  * `@Restaurante:token` $\rightarrow$ Token JWT enviado automaticamente pelo interceptor do Axios no header `Authorization: Bearer <token>`.
  * `@Restaurante:user` $\rightarrow$ Objeto JSON `{ id, name, email, role, isActive }` usado pelo `Header` e pelas rotas protegidas (`AdminRoute` e `StaffRoute`).
* **Sincronização de UI:** Login e logout disparam o evento customizado `window.dispatchEvent(new Event("auth-change"))` para atualizar o `Header` imediatamente sem recarregar a página.
* **Regra de Renovação de Permissão:** Sempre que um `ADMIN` altera o `role` ou o `isActive` de um usuário no banco, **o usuário precisa fazer logout e login novamente** para gerar um novo JWT com as permissões atualizadas.

---

## 3. Fluxo de Promoção e Ativação de Funcionários

1. **Cadastro Inicial:** Todo novo cadastro via `/register` nasce obrigatoriamente como `role: 'CLIENT'` e `isActive: false` (blindado no backend contra injeção de `role` no body).
2. **Promoção pelo Admin:** Na tela `/employees` (`AdminUsers.jsx`), o Admin informa o **e-mail** cadastrado do funcionário (`PATCH /users/employees/promote`).
   * O e-mail é normalizado (`trim().toLowerCase()`).
   * Usuários com `role: 'ADMIN'` não podem ser alterados por essa rota.
   * O usuário passa a ter `role: 'EMPLOYEE'` e `isActive: true`.
3. **Controle de Acesso:** O Admin pode alternar `isActive` (`true` / `false`) a qualquer momento pela tabela de equipe (`PUT /users/employees/:id/activate`).

---

## 4. Regras do Cardápio e Estoque (Models)

* **Categorias permitidas (`MenuItem.category` ENUM):**
  * `'ENTRADA'`
  * `'PRATO_PRINCIPAL'`
  * `'SOBREMESA'`
* **Visibilidade (`MenuItem.available`):**
  * Pratos nascem com `available: true`.
  * Pratos pausados (`available: false`) são ocultados na vitrine pública (`/cardapio`), mas continuam visíveis na gestão (`/cardapio/admin`) para que a equipe possa reativá-los.
* **Ficha Técnica e Estoque (`Product` & `MenuItemIngredient`):**
  * Unidades de medida (`Product.unit`): `'KG'`, `'G'`, `'L'`, `'ML'`, `'UN'`.
  * Quantidade exigida por porção (`MenuItemIngredient.quantityRequired`): `DECIMAL(10, 3)` sempre na mesma unidade do insumo (`0.150` em `KG` = 150g).


  <!-- # Regras de Negócio e Permissões (RBAC)

<!-- ## 1. Perfis de Acesso (`User.role`)
* **`CLIENT`** *(padrão no cadastro)*: Acessa reservas e o cardápio público (`/cardapio`).
* **`EMPLOYEE`**: Gerencia pratos, preços e disponibilidade (`/cardapio/admin`), **desde que esteja com `isActive: true`**.
* **`ADMIN`**: Acesso total — gerencia o cardápio e controla a equipe (`/employees`).

## 2. Fluxo de Promoção e Ativação
1. Novo usuário se cadastra normalmente (`role: CLIENT`, `isActive: false`).
2. O `ADMIN` promove o usuário pelo e-mail em `/employees` (`role: EMPLOYEE`, `isActive: true`) e pode ativar/desativar o acesso a qualquer momento.
3. Após alteração de perfil ou status, o usuário deve realizar **novo login** para atualizar o token JWT (`{ id, role, isActive }`).

## 3. Regras do Cardápio e Estoque
* **Categorias (`MenuItem.category`):** `ENTRADA`, `PRATO_PRINCIPAL` e `SOBREMESA`.
* **Disponibilidade (`available`):** Pratos com `available: false` ficam ocultos para clientes, mas permanecem visíveis na tela de gestão para reativação.
* **Ficha Técnica (`MenuItemIngredient`):** Quantidades sempre na unidade base do insumo (`KG`, `G`, `L`, `ML`, `UN`), com precisão de até 3 casas decimais. --> -->