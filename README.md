# Mulher Segura Tec Web

Aplicação web para o projeto **Mulher Segura**, composta por:  

- 🌐 **Frontend** em [Next.js](https://nextjs.org/)  
- ⚙️  **Backend** em [Node.js](https://nodejs.org/) com API REST  
- 🐘 Banco de dados **PostgreSQL** (via Docker Compose)  

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 📦 Estrutura do Projeto

```
mulher-segura-tec-web/
├── backend/          # API Node.js + Docker Compose
│   ├── .env.example  # Exemplo de variáveis de ambiente
│   ├── docker-compose.yml
│   └── src/
├── frontend/         # Aplicação Next.js
│   └── app/
├── README.md
```

---

## 🚀 Como rodar o projeto

### 📥 1. Clonar o repositório

```bash
git clone https://github.com/savio04/mulher-segura-tec-web.git
cd mulher-segura-tec-web
```

---

### ⚙️ 2. Configurar variáveis de ambiente

#### Backend
Copie o arquivo `.env.example` e renomeie para `.env`:

```bash
cd backend
cp .env.example .env
```

Edite o `.env` conforme necessário (ajuste credenciais do banco se quiser rodar sem Docker).

#### Frontend
Copie o arquivo `.env.local.example` e renomeie para `.env.local`:

```bash
cd ../frontend
cp .env.example .env.local
```

Edite o `.env.local` para apontar para o backend (ex.: `http://localhost:8080`).

---

### 🐳 3. Subir banco de dados com Docker

O backend já inclui um `docker-compose.yml` para subir o banco Postgres:  

```bash
cd ../backend
docker-compose up -d
```

Isso vai:  
- Criar um container Postgres com as credenciais definidas no `.env`
- Banco disponível em `localhost:5432`

---

### 🔥 4. Rodar o Backend

📦 Instalar dependências:  
```bash
cd backend
npm install
# ou
pnpm install
```

💻 Rodar servidor de desenvolvimento:  
```bash
npm run dev:server
# ou
pnpm dev:server
```

🌐 Backend disponível em: [http://localhost:8080](http://localhost:8080)

---

### 🌐 5. Rodar o Frontend

📦 Instalar dependências:  
```bash
cd ../frontend
npm install
# ou
pnpm install
```

💻 Rodar servidor de desenvolvimento:  
```bash
npm run dev
# ou
pnpm dev
```

🌐 Frontend disponível em: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Scripts úteis

| Diretório | Comando             | Descrição                       |
|-----------|---------------------|-----------------------------------|
| backend   | `npm run dev:server`       | Inicia o servidor Node.js        |
| backend   | `docker-compose up -d` | Sobe o banco de dados MySQL      |
| frontend  | `npm run dev`       | Inicia o frontend Next.js        |
| ambos     | `npm run build`     | Gera build de produção           |
| ambos     | `npm start`         | Inicia servidor em produção      |

---

## 📦 Deploy

Para ambiente de produção:  
1. Faça build do frontend: `npm run build`
2. Configure variáveis de ambiente no servidor
3. Rode o backend com Docker ou PM2
4. Sirva o frontend com Vercel ou Next.js standalone

---
