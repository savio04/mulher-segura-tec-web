import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { NextApiRequest, NextPageContext } from "next";
import Router from "next/router";
import { parseCookies } from "nookies";

type ContextType = Pick<NextPageContext, "req"> | { req: NextApiRequest; } | null | undefined

export function apiClientContext(ctx?: ContextType) {
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

    return {} as InternalAxiosRequestConfig<unknown> | Promise<InternalAxiosRequestConfig<unknown>>
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
