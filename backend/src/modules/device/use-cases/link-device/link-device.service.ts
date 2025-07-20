import { DeviceStatus, HTTP_STATUS } from "../../../../shared/utils/contants"
import { DeviceRepository } from "../../repositories/device-repository"

interface CreateUserParams {
  device_id: string
  device_secret: string
  logged_user_id: string
}

export class LinkDeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository
  ) { }

  async execute(params: CreateUserParams) {
    const device = await this.deviceRepository.findById(params.device_id)

    if (!device || device?.secret !== params.device_secret) {
      const error = new Error("Dispositivo não encontrado")

      Reflect.defineProperty(error, "statusCode", { value: HTTP_STATUS.NOT_FOUND })

      throw error
    }

    if (device.user_id && device.user_id !== params.logged_user_id) {
      const error = new Error(
        "Dispositivo não pertence ao usuário autenticado. Se você acredita que isso é um erro, por favor, entre em contato com o suporte. Note que acessos não autorizados estão sendo monitorados."
      )

      Reflect.defineProperty(error, "statusCode", { value: HTTP_STATUS.CONFLICT })

      throw error
    }

    await this.deviceRepository.update(device.id, {
      status: DeviceStatus.LINKED,
      user_id: params.logged_user_id
    })
  }
}
