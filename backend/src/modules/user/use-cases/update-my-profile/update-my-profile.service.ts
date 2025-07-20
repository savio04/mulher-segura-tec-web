import { HTTP_STATUS } from "../../../../shared/utils/contants"
import { UserRepository } from "../../repositories/user-repository"

interface IRequest {
  user_id: string
  full_name?: string
  email?: string
}

export class UpdateMyProfileService {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async execute(params: IRequest) {
    const user = await this.userRepository.findById(params.user_id)

    if (!user) {
      const error = new Error("Usuário não encontrado")

      Reflect.defineProperty(error, "statusCode", { value: HTTP_STATUS.NOT_FOUND })

      throw error
    }

    if (params.email) {
      const userAlredyExists = await this.userRepository.findByEmail(params.email)

      if (userAlredyExists) {
        const error = new Error("Email já esta em uso")

        Reflect.defineProperty(error, "statusCode", { value: HTTP_STATUS.CONFLICT })

        throw error
      }
    }

    await this.userRepository.update(user.id, {
      full_name: params.full_name,
      email: params.email
    })

    return user
  }
}
