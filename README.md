# 📚 Biblioteca App

> **Nota:** Este é um README temporário em fase de desenvolvimento.

Aplicação web front-end para gerenciamento de acervo de biblioteca, desenvolvida com **Angular 14** e **Angular Material**.

---

## ✨ Funcionalidades Atuais

- **Autenticação e Controle de Acesso**: Login/Logout com proteção de rotas (`AuthActivateRouteGuard`) e interceptador HTTP (`XhrInterceptor`).
- **Dashboard**: Painel inicial para usuários autenticados.
- **Gerenciamento de Livros**:
  - Listagem e busca/filtro de livros.
  - Cadastro de novos livros.
  - Edição de informações de livros existentes.
  - Exclusão de livros via diálogo de confirmação.
- **Gerenciamento de Autores**: Cadastro rápido de autores integrado aos diálogos do sistema.

---

## 🛠️ Tecnologias Utilizadas

- **[Angular 14](https://angular.io/)** (`~14.2.0`)
- **[Angular Material](https://material.angular.io/)** (`^13.0.0`)
- **RxJS** (`~7.5.0`)
- **ng2-search-filter** (`^0.5.1`)
- **ngx-mask** (`^15.1.0`)
- **typescript-cookie** (`^1.0.4`)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão compatível com Angular 14, ex.: Node 14.x ou 16.x)
- **Angular CLI** (`npm install -g @angular/cli@14`)
- **API Back-end** rodando localmente (por padrão configurada em `http://localhost:8888` no arquivo `src/environments/environment.ts`)

### Passo a passo

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   # ou
   ng serve
   ```

3. **Acesse no navegador:**
   ```
   http://localhost:4200/
   ```

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm start` / `ng serve` | Inicia o servidor de desenvolvimento em `http://localhost:4200/` |
| `npm run build` | Gera o build de produção na pasta `dist/` |
| `npm run watch` | Compila em modo de desenvolvimento observando alterações |
| `npm test` | Executa os testes unitários via Karma/Jasmine |

---

## 📂 Estrutura Básica do Projeto

```text
src/app/
├── components/
│   ├── books/             # Listagem e visualização do acervo
│   ├── dashboard/         # Painel principal
│   ├── home/              # Página inicial pública
│   ├── login/ & logout/   # Fluxo de autenticação
│   ├── system-dialogs/    # Modais (add-book, edit-book, delete-book, add-author)
│   └── toolbar/           # Barra de navegação superior
├── interceptors/          # Interceptadores de requisições HTTP
├── model/                 # Modelos de dados (Book, Author, User, etc.)
├── routeguards/           # Guardas de rota de autenticação
└── services/              # Comunicação com a API back-end
```
