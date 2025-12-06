# GoodVibes - Backend

API backend simples para gerenciamento de "confissões".

Este repositório contém uma API em Node.js + Express com Prisma (Postgres) para persistência.

## Tecnologias

- Node.js (ES Modules)
- Express
- Prisma (PostgreSQL)

## Pré-requisitos

- Node.js (>= 18 recomendado)
- PostgreSQL disponível (ou acesso a uma URL de banco compatível)
- `npm` ou `pnpm`/`yarn`

## Instalação rápida

1. Clone o repositório

2. Instale dependências:

```powershell
npm install
```

3. Crie um arquivo `.env` na raiz com a variável de conexão (exemplo):

```ini
# .env
DATABASE_URL=postgresql://USER:PASS@HOST:PORT/DATABASE?schema=public
# variável opcional para bloqueio de palavras (Base64, lista separada por vírgula)
# PALAVRAS_PROIBIDAS_BASE64=YmFkLGJlc3Rlcg==
```

Dica: para gerar o valor Base64 para `PALAVRAS_PROIBIDAS_BASE64` (ex.: `palavra1,palavra2`), em Node:

```powershell
node -e "console.log(Buffer.from('palavra1,palavra2').toString('base64'))"
```

4. Prepare o banco (duas opções comuns):

- Se já houver migrations (método recomendado para produção):

```powershell
npx prisma migrate deploy
```

- Ou, em ambiente de desenvolvimento para sincronizar o schema:

```powershell
npx prisma db push
```

5. (Opcional) Rode o seed

```powershell
npm run seed
```

## Scripts úteis

- `npm run dev` — inicia o servidor com `nodemon` (ver `package.json`).
- `npm run studio` — abre o Prisma Studio (`npx prisma studio`).
- `npm run seed` — executa o `prisma/seed.js`.

## Estrutura principal

- `server.js` — entrada do servidor
- `src/routes` — rotas registradas (ex.: `confissoesRoutes.js`, `usuariosRoutes.js`)
- `src/controllers` — controladores com a lógica de endpoints
- `src/models` — camada de acesso ao banco (Prisma)
- `prisma/schema.prisma` — modelo do banco

## Endpoints principais (confissões)

Assumindo que o servidor roda em `http://localhost:3000` (ver `server.js`):

- GET `/confissoes/` — lista todas as confissões
- GET `/confissoes/:id` — obtém confissão por id
- POST `/confissoes/` — cria uma confissão
- PUT `/confissoes/:id` — atualiza
- DELETE `/confissoes/:id` — remove
- GET `/confissoes/tipo/:tipo` — filtra por tipo (romantica, amizade, motivacional, comedia, reflexiva)
- GET `/confissoes/anonimas` — lista confissões cujo remetente é anônimo

### Exemplo: criar confissão (PowerShell)

Usando `curl.exe` para evitar alias do PowerShell:

```powershell
curl.exe -X POST http://localhost:3000/confissoes/ -H "Content-Type: application/json" -d '{"mensagem":"Olá, isso é um teste","tipoMensagem":"amizade","remetenteId":1,"destinatarioId":2}'
```

Ou usando `Invoke-RestMethod` (PowerShell):

```powershell
$body = @{mensagem='Olá, isso é um teste'; tipoMensagem='amizade'; remetenteId=1; destinatarioId=2} | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://localhost:3000/confissoes/ -Body $body -ContentType 'application/json'
```

## Variáveis de ambiente (resumo)

- `DATABASE_URL` (obrigatória) — string de conexão com PostgreSQL.
- `PALAVRAS_PROIBIDAS_BASE64` (opcional) — lista de palavras separadas por vírgula, codificada em Base64; quando fornecida, o backend rejeita mensagens que contenham palavras proibidas.

## Erros comuns e solução rápida

- Erro de conexão com o banco: verifique `DATABASE_URL` e se o banco está acessível.
- Migrations faltando: rode `npx prisma migrate deploy` ou `npx prisma db push` conforme o caso.
- `PALAVRAS_PROIBIDAS_BASE64` malformado: remova ou corrija o conteúdo Base64.

## Desenvolvimento e testes locais

1. Ajuste `.env`
2. Rode as migrations / db push
3. Inicie o servidor:

```powershell
npm run dev
```

4. Teste endpoints com `curl`, Postman ou Insomnia.

## Contribuições

Sinta-se à vontade para abrir issues e PRs.

## Observações finais

- O projeto usa ES Modules (`type: "module"` no `package.json`).
- Se você alterou o schema Prisma, lembre-se de gerar/reinstalar o client:

```powershell
npx prisma generate
```

---

Se quiser, eu adapto o README com exemplos adicionais (ex.: usuários, autenticação) ou adiciono um `Makefile` / scripts mais completos para Windows PowerShell.