import { NextFunction, Request, Response } from "express";
import { PgUserRepository } from "../../../../shared/infra/postgres/repositories/pg-user-repository";
import { UpdateMyProfileService } from "./update-my-profile.service";

export class UpdateMyProfileController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const userRepository = new PgUserRepository()

    const service = new UpdateMyProfileService(userRepository)

    try {
      const result = await service.execute({
        ...request.body,
        user_id: request.user.id
      })

      return response.status(200).json({ payload: result })
    } catch (error) {
      next(error)
    }
  }
}
