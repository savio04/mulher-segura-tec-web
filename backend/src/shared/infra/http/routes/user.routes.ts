import { RequestHandler, Router } from "express"
import { CreateUserController } from "../../../../modules/user/use-cases/create-user/create-user.controller"
import { AuthenticateUserController } from "../../../../modules/user/use-cases/authenticate-user/authenticate-user.controller"
import { GetMyProfileController } from "../../../../modules/user/use-cases/my-profile/get-my-profile.controller"
import { authenticated } from "../middlewares/authenticate-user"

export const userRoutes = Router()

const createUserController = new CreateUserController()
userRoutes.post("/users/signup", createUserController.handle as RequestHandler)

const authenticateUserController = new AuthenticateUserController()
userRoutes.post("/users/signin", authenticateUserController.handle as RequestHandler)

const getMyProfile = new GetMyProfileController()
userRoutes.get("/users/my-profile", authenticated, getMyProfile.handle as RequestHandler)
