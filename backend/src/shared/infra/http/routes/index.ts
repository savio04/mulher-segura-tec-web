import { Router } from "express"
import { userRoutes } from "./user.routes"

export const routesV1 = Router()

routesV1.use("/v1", userRoutes)
