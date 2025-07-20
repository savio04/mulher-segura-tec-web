import { PgConnection } from "..";
import { Device } from "../../../../modules/device/models/device";
import { DeviceRepository, UpdateParams } from "../../../../modules/device/repositories/device-repository";

export class PgDeviceRepository implements DeviceRepository {
  async findById(id: string): Promise<Device | null> {
    const result = await PgConnection.query(
      'SELECT * FROM devices WHERE id = $1',
      [id]
    )

    return result.rows[0] as Device
  }

  async update(id: string, params: UpdateParams): Promise<void> {
    if (Object.keys(params).length === 0) {
      return
    }

    const setClauses = Object.keys(params)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ")

    const values = [id, ...Object.values(params)]

    const query = `UPDATE devices SET ${setClauses} WHERE id = $1`

    await PgConnection.query(query, values)
  }
}
