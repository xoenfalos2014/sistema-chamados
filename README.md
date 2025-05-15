
# Sistema de Chamados com Firebase

Este projeto contém duas áreas principais:

## 🔹 Área do Cliente
- `index.html` → Página inicial com botões para Cliente e Administrador
- `cliente-login.html` → Tela de login do cliente
- `cliente.html` → Formulário para enviar novo chamado
- `cliente-chamados.html` → Tela para acompanhar chamados enviados

## 🔹 Área do Administrador
- `admin-login.html` → Tela de login do administrador
- `painel-admin.html` → Painel central com botões de acesso
- `admin-chamados.html` → Visualização e gerenciamento de chamados
- `admin-tecnicos.html` → Visualização dos técnicos online e mensagens internas

## 🧩 Recursos Comuns
- `js/firebase-config.js` → Configuração do Firebase
- `style.css` → Estilo padrão do sistema
- `som/alerta.mp3` → Som de notificação para mensagens
- `img/fundo-suporte.jpg` → Imagem de fundo do sistema

## 🚀 Deploy
Para funcionamento correto no Vercel:
1. Suba todos os arquivos deste pacote no GitHub
2. Certifique-se de que `painel-admin.html`, `admin-chamados.html`, `admin-tecnicos.html` estão na raiz
3. Após login, o administrador será redirecionado para `painel-admin.html`, onde poderá escolher o painel desejado.
