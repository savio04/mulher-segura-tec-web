import { RequestHandler, Router } from "express"
import { LinkDeviceController } from "../../../../modules/device/use-cases/link-device/link-device.controller"
import { authenticated } from "../middlewares/authenticate-user"
import { UnlinkDeviceController } from "../../../../modules/device/use-cases/unlink-device/unlink-device.controller"

export const deviceRoutes = Router()

const linkDeviceController = new LinkDeviceController()
deviceRoutes.post("/link", authenticated, linkDeviceController.handle as RequestHandler)

const unlinkDeviceController = new UnlinkDeviceController()
deviceRoutes.post("/unlink", authenticated, unlinkDeviceController.handle as RequestHandler)

