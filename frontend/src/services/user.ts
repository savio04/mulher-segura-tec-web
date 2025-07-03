import { api } from "./axios";

export interface SignUpUserProps {
  full_name: string
  email: string
  password: string
}

export async function signUpUser(formData: SignUpUserProps) {
  try {
    const response = await api.post("/v1/users/signup", formData);

    return response.data.payload
  } catch (error) {
    console.log(error)
    throw { error: "Falha, verifique os dados e tente novamente" };
  }
}

export interface SignInUserProps {
  email: string
  password: string
}

export async function signInUser(formData: SignInUserProps) {
  try {
    const response = await api.post("/v1/users/signin", formData);

    return response.data.payload
  } catch (error) {
    console.log(error)
    throw { error: "Falha, verifique os dados e tente novamente" };
  }
}

export async function getMyProfile() {
  try {
    const response = await api.get("/v1/users/my-profile");

    return response.data.payload
  } catch (error) {
    console.log(error)
    throw { error: "Falha, verifique os dados e tente novamente" };
  }
}
