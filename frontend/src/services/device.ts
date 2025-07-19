import { api } from "./axios";

export interface LinkDeviceProps {
  device_id: string
  device_secret: string
}

export async function linkDevice(formData: LinkDeviceProps) {
  try {
    const response = await api.post("/v1/devices/link", formData);

    return response.data.payload
  } catch (error) {
    console.log(error)
    throw { error: "Falha, verifique os dados e tente novamente" };
  }
}

export interface UnlikDeviceProps {
  device_id: string
}

export async function unlikDevice(formData: UnlikDeviceProps) {
  try {
    const response = await api.post("/v1/devices/unlink", formData);

    return response.data.payload
  } catch (error) {
    console.log(error)
    throw { error: "Falha, verifique os dados e tente novamente" };
  }
}
