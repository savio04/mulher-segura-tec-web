import { DeviceStatus, HTTP_STATUS } from "../../../../shared/utils/contants"
import { DeviceRepository } from "../../repositories/device-repository"

interface CreateUserParams {
  device_id: string
}

export class UnlinkDeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository
  ) { }

  async execute(params: CreateUserParams) {
    const device = await this.deviceRepository.findById(params.device_id)

    if (!device) {
      const error = new Error("Dispositivo não encontrado")

      Reflect.defineProperty(error, "statusCode", { value: HTTP_STATUS.NOT_FOUND })

      throw error
    }

    await this.deviceRepository.update(device.id, {
      status: DeviceStatus.IDLE,
      user_id: null
    })
  }
}
