import { NextFunction, Request, Response } from "express";
import { PgUserRepository } from "../../../../shared/infra/postgres/repositories/pg-user-repository";
import { AuthenticateUserService } from "./authenticate-user.service";

export class AuthenticateUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const userRepository = new PgUserRepository()

    const service = new AuthenticateUserService(userRepository)

    try {
      const result = await service.execute(request.body)

      return response.status(200).json({ payload: result })
    } catch (error) {
      next(error)
    }
  }
}
