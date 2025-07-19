'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth, UserProps } from "./AuthContext";

interface DeviceContextType {
  connected: boolean
  connecting: boolean
  connect: (deviceId: string, deviceSecret: string) => void
  disconnect: () => void
  device: UserProps["device"] | null
}

const DeviceContext = createContext<DeviceContextType>({} as DeviceContextType);

export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()

  const [socket, setSocket] = useState<Socket | null>(null)
  const [device, setDevice] = useState<UserProps["device"] | null>(null)
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)

  const connect = (deviceId: string, deviceSecret: string) => {
    setConnecting(true);

    const newSocket = io(process.env.NEXT_PUBLIC_API_URL, {
      auth: { device_id: deviceId, device_secret: deviceSecret },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 5000,
    })

    newSocket.on("connect", () => {
      console.log("✅ Dispositivo conectado")
      setConnected(true)
      setConnecting(false)
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Dispositivo desconectado")
      setConnected(false)
    })

    newSocket.on("connect_error", (err) => {
      console.log("⚠️ Erro ao conectar:", err.message)
      setConnecting(false)
    })

    setSocket(newSocket)
    console.log("here ok device")
    setDevice({
      id: deviceId,
      secret: deviceSecret,
      status: ""
    })
  }

  const disconnect = () => {
    socket?.disconnect()
    setSocket(null)
    setConnected(false)
  }

  useEffect(() => {
    if (user?.device) {
      setDevice(user?.device)
    }

    if (user?.device && !connected) {
      connect(user.device.id, user.device.secret)
    }

    return () => {
      socket?.disconnect()
    };
  }, [user?.device])

  return (
    <DeviceContext.Provider value={{ connected, connecting, connect, disconnect, device }}>
      {children}
    </DeviceContext.Provider>
  )
}

export const useDevice = () => useContext(DeviceContext)
