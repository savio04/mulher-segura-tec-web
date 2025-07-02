import { HTTP_STATUS, TOKEN_EXPIRATION } from "../../../../shared/utils/contants"
import { UserRepository } from "../../repositories/user-repository"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface AuthenticateUserParams {
  email: string
  password: string
}

export class AuthenticateUserService {
  constructor(
    private userRepository: UserRepository,
  ) {
  }

  async execute(params: AuthenticateUserParams) {
    const user = await this.userRepository.findByEmail(params.email)

    if (!user) {
      const error = new Error("Email ou senha invalidos")

      Reflect.defineProperty(error, "statusCode", { value: HTTP_STATUS.NOT_FOUND })

      throw error
    }

    const validPassoword = bcrypt.compareSync(params.password, user.password)

    if (!validPassoword) {
      const error = new Error("Email ou senha invalidos")

      Reflect.defineProperty(error, "statusCode", { value: HTTP_STATUS.CONFLICT })

      throw error
    }

    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

    const token = jwt.sign({ id: user.id! }, ACCESS_TOKEN_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    })

    return {
      token,
      user: {
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    }
  }
}
