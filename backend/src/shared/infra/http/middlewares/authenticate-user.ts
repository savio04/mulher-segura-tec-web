import { NextFunction, Request, response, Response } from "express"
import { verify } from "jsonwebtoken"
import { PgUserRepository } from "../../postgres/repositories/pg-user-repository"
import { HTTP_STATUS } from "../../../utils/contants"

interface IPayloadToken {
  id: string
}

export async function authenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: "Token inválido"
    })
  }

  const [, token] = authHeader.split(" ")


  try {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

    if (!ACCESS_TOKEN_SECRET) {
      return response.status(HTTP_STATUS.UNAUTHORIZED).json({
        error: "Token inválido"
      })
    }

    const { id } = verify(token, ACCESS_TOKEN_SECRET, {
      algorithms: ["HS256"],
    }) as IPayloadToken

    const userRepository = new PgUserRepository()

    const user = await userRepository.findById(id)

    request.user = {
      id: user.id!,
      full_name: user.full_name,
      role: user.role,
    }

    return next()
  } catch (err) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: "Token inválido"
    })
  }
}
