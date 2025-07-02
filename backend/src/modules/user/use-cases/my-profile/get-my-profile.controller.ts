import { NextFunction, Request, Response } from "express";
import { PgUserRepository } from "../../../../shared/infra/postgres/repositories/pg-user-repository";
import { GetMyProfileService } from "./get-my-profile.service";

export class GetMyProfileController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const userRepository = new PgUserRepository()

    const service = new GetMyProfileService(userRepository)

    try {
      const result = await service.execute(request.user.id)

      return response.status(200).json({ payload: result })
    } catch (error) {
      next(error)
    }
  }
}
