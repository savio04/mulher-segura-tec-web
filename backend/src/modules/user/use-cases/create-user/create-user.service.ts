import { HTTP_STATUS, Roles } from "../../../../shared/utils/contants"
import { UserRepository } from "../../repositories/user-repository"
import bcrypt from "bcrypt"

interface CreateUserParams {
  full_name: string
  email: string
  password: string
}

export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async execute(params: CreateUserParams) {
    const userAlredyExists = await this.userRepository.findByEmail(params.email)

    if (userAlredyExists) {
      const error = new Error("Email já esta em uso")

      Reflect.defineProperty(error, "statusCode", { value: HTTP_STATUS.CONFLICT })

      throw error
    }

    const passwordHash = await bcrypt.hash(params.password, 8)

    return await this.userRepository.create({
      email: params.email,
      full_name: params.full_name,
      password: passwordHash,
      role: Roles.CUSTOMER
    })
  }
}
