import { HTTP_STATUS } from "../../../../shared/utils/contants"
import { UserRepository } from "../../repositories/user-repository"

export class GetMyProfileService {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async execute(userId: string) {
    const user = await this.userRepository.getMyProfile(userId)

    if (!user) {
      const error = new Error("Usuário não encontrado")

      Reflect.defineProperty(error, "statusCode", { value: HTTP_STATUS.NOT_FOUND })

      throw error
    }

    return user
  }
}
