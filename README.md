# Typed API
Este projeto é uma aplicação Node.js com auto-documentação feita pelo Swagger em Fastify, Zod e Typescript.

## Ferramentas utilizadas
As seguintes bibliotecas foram utilizadas neste projeto:
- **Zod**: Para validação dos dados;
- **Fastify**: Para criação da API;
- **TypeScript**: para assegurar a tipagem correta e limpa.

## Pré-requisitos
Esse template foi criado com as seguintes ferramentas e versões:
- [Node.js](https://nodejs.org/) (versão 20.18.0)
- [pnpm](https://pnpm.io/pt/) (versão 10.11.0)

## Instalação
Siga os passos abaixo para configurar o projeto:

**Clone o repositório:**

```bash    
git clone https://github.com/gabrieloliveirapimentel/typed-api.git
cd typed-api
```

**Instale as dependências:**
Usando pnpm:
```bash
pnpm i
```

**Inicie o servidor de desenvolvimento:**
Usando pnpm:
```bash
pnpm run dev
```

**Acesse a documentação da API:**
Acesse o endpoint inicial da documentação em [http://localhost:3333/docs](http://localhost:3333/docs).

## Estrutura do Projeto
```bash
- src/: Contém os arquivos principais do projeto.
    -- @types/: 
    --- index.ts: Tipagem necessária do projeto.
    -- routes/: 
    --- index.ts: Rotas de CRUD do projeto.
    server.ts: Ponto de entrada da aplicação.
```

## Criando um novo Projeto com Zod, Fastify e TypeScript
Se você deseja criar um novo projeto do zero como este, siga estas etapas:

**Inicialize o projeto:**
```bash
mkdir nome-do-projeto
cd nome-do-projeto
pnpm init
```

**Instale as dependências:**
```bash
pnpm i fastify fastify-type-provider-zod @fastify/cors zod 
pnpm i @fastify/swagger @fastify/swagger-ui
```

**Instale as dependências de desenvolvimento:**
```bash
pnpm i tsx typescript @types/node -D
```

**Configure o TypeScript:**
```bash
pnpm tsc --init
```

**Crie o arquivo inicial:**
```bash
touch src/server.ts
```

**No arquivo ``server.ts`` insira o código base:**
```typescript
import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
 
const app = fastify()

app.register(fastifyCors, { origin: '*' })

app.listen({ port: 3333 }).then(() => {
    console.log('Server is running at http://localhost:3333')
})
```

**Inicie o servidor:**
```bash
pnpm tsx watch src/server.ts
```

## Referências
- [Documentação do Zod](https://zod.dev/)
- [Documentação do Fastify](https://www.fastify.io/)
- [Documentação do TypeScript](https://www.typescriptlang.org/)  