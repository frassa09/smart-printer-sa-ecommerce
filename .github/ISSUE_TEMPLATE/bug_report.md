---
name: Bug Report
about: Relate um problema ou erro no sistema para nos ajudar a corrigi-lo.
title: '[BUG]: '
labels: 'bug'
assignees: ''
---

**Descrição do Bug**
Uma explicação clara e objetiva sobre o comportamento incorreto. Ex: Ao tentar aprovar uma permissão de funcionário, o sistema retorna um erro 500 ou não atualiza a interface.

**Módulo / Onde ocorreu?**
Marque com um `x` onde o erro foi identificado:
- [ ] Frontend (Interface web / Vite)
- [ ] Backend (API Node.js / Express)
- [ ] Impressora IoT / Serviço de Impressão
- [ ] Banco de Dados (Neon / Sequelize)
- [ ] Autenticação / RBAC
- [ ] Outro: ____

**Passo a Passo para Reproduzir**
Etapas exatas para reproduzir o problema:
1. Acesse o painel com perfil de ADMIN
2. Navegue até a tela de Funcionários (`/employees`)
3. Clique no botão 'Ativar' do usuário X
4. Observe o erro no console / aba Network

**Comportamento Esperado**
O que deveria ter acontecido se o sistema estivesse funcionando normalmente:

**Evidências / Screenshots**
Anexe prints da tela, requisições de rede ou logs do terminal.

| Evidência | Descrição |
| --- | --- |
| *(Cole a imagem/print aqui)* | Print da tela mostrando o aviso de erro |
| *(Cole o print do DevTools aqui)* | Retorno da requisição na aba Network |

**Informações de Ambiente**
- **Sistema Operacional:** [ex: Windows 11, macOS, Linux]
- **Navegador:** [ex: Chrome, Firefox, Edge]
- **Versão do Node.js:** [ex: v18.x, v20.x]
- **Dispositivo IoT:** [ex: Modelo / Firmware]

**Contexto Adicional**
Adicione qualquer outro detalhe, logs do servidor ou observações relevantes.