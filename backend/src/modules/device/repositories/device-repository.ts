import { Device } from "../models/device"

export interface UpdateParams {
  status?: string
  user_id?: string | null
}

export abstract class DeviceRepository {
  abstract update(id: string, params: UpdateParams): Promise<void>
  abstract findById(id: string): Promise<Device | null>
}
