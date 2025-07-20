import { NextFunction, Request, Response } from "express";
import { PgDeviceRepository } from "../../../../shared/infra/postgres/repositories/pg-device-repository";
import { UnlinkDeviceService } from "./unlink-device.service";

export class UnlinkDeviceController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const deviceRepository = new PgDeviceRepository()

    const service = new UnlinkDeviceService(deviceRepository)

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
