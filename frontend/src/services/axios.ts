import axios, { AxiosError } from "axios"
import Router from "next/router";
import { parseCookies } from "nookies";

export function apiClientContext(ctx?: any) {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  api.interceptors.request.use(config => {
    const cookies = parseCookies(ctx)
    const token = cookies["@mulhersegura.token"]

    try {
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config;
    } catch (e) {
      console.log({ error: e })
    }
  })

  api.interceptors.response.use((response) => {
    return response;
  }, (error: AxiosError) => {

    if (error?.response?.status === 401) {
      if (!ctx) {
        Router.push("/signin")
      }

      return Promise.reject({
        ...error,
        message: "Sua sessão expirou",
        response: {
          ...error.response,
          data: "Sua sessão expirou"
        }
      } as AxiosError)
    }

    return Promise.reject({
      ...error
    })
  })

  return api;
}

export const api = apiClientContext()
