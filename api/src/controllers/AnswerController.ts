import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswerController {
    
    // http://localhost:3333/answers/2?u=848b7482-107a-42d0-8d64-44b07e4a262e
    /**
     * Route Params => Parametros que compõe a rota (são obrigatórios)
     * Sempre começa com "/"
     * Exemplos de Route Params: "/answers/"
     * routes.get("/aswers/:value")
     * 
     * Query Params => Busca, paginação (não são obrigatórios)
     * Sempre vem depois de um "?"
     * chave=valor
     */

    async execute (request: Request, response: Response){
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        })

        if(!surveyUser){
            throw new AppError("Survey User does not exists!")
            // return response.status(400).json({
            //     error: "Survey User does not exists!"
            // })
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController }