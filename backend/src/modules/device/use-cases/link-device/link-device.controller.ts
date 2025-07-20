import { NextFunction, Request, Response } from "express";
import { LinkDeviceService } from "./link-device.service";
import { PgDeviceRepository } from "../../../../shared/infra/postgres/repositories/pg-device-repository";

export class LinkDeviceController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const deviceRepository = new PgDeviceRepository()

    const service = new LinkDeviceService(deviceRepository)

    try {
      const result = await service.execute({
        ...request.body,
        logged_user_id: request.user.id
      })

      return response.status(200).json({ payload: result })
    } catch (error) {
      next(error)
    }
  }
}
