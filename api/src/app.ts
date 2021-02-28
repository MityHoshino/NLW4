import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import createConnection from "./database";
import { router } from './routes';
import { AppError } from './errors/AppError';


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

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        });
    }
    return response.status(500).json({
        status: "Error",
        mesasage: `Internal server error ${err.message}`,
    });
});

export { app };