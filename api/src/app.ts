import 'reflect-metadata'
import express from 'express';
import createConnection from "./database";
import { router } from './routes';

createConnection();
const app = express();

/**
 * GET = Busca
 * POST = Salvar
 * PUT = Alterar
 * DELETE = Deletar
 * PATCH = Alteração específica
 */

// http://localhost:3333/users

// MOVER TUDO ISSO ABAIXO PARA ROUTES
// app.get("/users", (request, response) => {
//     return response.json({message: "Hello World - NLW04"});
// })

// app.post("/", (request, response) => {
//     // Recebeu os dados para salvar
//     return response.json({mensagem: "Os dados foram salvos com sucesso!"});
// })

app.use(express.json());
app.use(router);

export { app };