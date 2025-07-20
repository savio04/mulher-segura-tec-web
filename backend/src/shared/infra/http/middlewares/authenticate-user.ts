import { NextFunction, Request, Response } from "express"
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
    response.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: "Token inválido"
    })

    return
  }

  const [, token] = authHeader.split(" ")

  try {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

    if (!ACCESS_TOKEN_SECRET) {
      response.status(HTTP_STATUS.UNAUTHORIZED).json({
        error: "Token inválido"
      })

      return
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

    next()
  } catch (err) {
    response.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: "Token inválido"
    })
  }
}
