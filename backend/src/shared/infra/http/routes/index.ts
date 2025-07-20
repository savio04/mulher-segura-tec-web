import { Router } from "express"
import { userRoutes } from "./user.routes"
import { deviceRoutes } from "./device.routes"

export const routesV1 = Router()

routesV1.use("/users", userRoutes)
routesV1.use("/devices", deviceRoutes)
