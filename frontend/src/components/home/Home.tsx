"use client"
import { MdPause, MdPlayArrow, MdWifiOff } from "react-icons/md";
import Button from "../ui/button/Button";
import { useDevice } from "@/context/DeviceContext";
import { useEffect, useRef, useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { linkDevice, unlikDevice } from "@/services/device";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

interface Alert {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

export function HomeComponent() {
  const { connected, connecting, connect, disconnect, device } = useDevice();
  const { user } = useAuth()
  const [deviceId, setDeviceId] = useState(device?.id);
  const [deviceSecret, setDeviceSecret] = useState("");

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [playing, setPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // 🚨 Simula alertas aleatórios
  useEffect(() => {
    const alertTypes = [
      { type: "FALL", message: "Queda detectada!" },
      { type: "NOISE", message: "Som alto detectado!" },
      { type: "MOVEMENT", message: "Movimento brusco detectado!" },
    ];

    const alertInterval = setInterval(() => {
      const randomAlert =
        alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const newAlert: Alert = {
        id: crypto.randomUUID(),
        timestamp: new Date().toLocaleTimeString(),
        ...randomAlert,
      };
      setAlerts((prev) => [newAlert, ...prev].slice(0, 10));
    }, 5000);

    return () => clearInterval(alertInterval);
  }, []);

  function getFrequencyFromId(id: string) {
    const sum = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return 300 + (sum % 500);
  }

  // 🎙️ Gera áudio fake
  const startFakeAudio = (id: string) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioCtx = audioContextRef.current;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(getFrequencyFromId(id), audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillatorRef.current = oscillator;
    gainRef.current = gainNode;
  };

  const stopFakeAudio = () => {
    oscillatorRef.current?.stop();
    oscillatorRef.current?.disconnect();
    gainRef.current?.disconnect();

    oscillatorRef.current = null;
    gainRef.current = null;
  };

  const togglePlay = () => {
    if (playing) {
      stopFakeAudio();
    } else if (user?.id) {
      startFakeAudio(user?.id);
    }
    setPlaying(!playing);
  };

  async function handleLinkDevice(event: React.FormEvent) {
    event.preventDefault();

    if (!deviceId || !deviceSecret) {
      return;
    }

    try {
      await linkDevice({
        device_id: deviceId,
        device_secret: deviceSecret
      })

      connect(deviceId, deviceSecret)
    } catch (error) {
      toast.error('Falha, tente novamente!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  async function handleUnlinkDevice() {
    if (!deviceId) {
      return;
    }

    try {
      await unlikDevice({
        device_id: deviceId,
      })

      disconnect()
    } catch (error) {
      toast.error('Falha, tente novamente!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  useEffect(() => {
    if (device) {
      setDeviceId(device.id)
    }
  }, [device])

  if (!connected) {
    return (
      <div className="flex w-full items-center justify-center p-4 h-[calc(100vh-170px)]">
        <div className="rounded-lg p-8 max-w-sm w-full text-center">
          <MdWifiOff className="mx-auto mb-4 text-red-500" size={72} />

          <h1 className="mb-6 font-semibold text-gray-800 dark:text-white/90">
            Dispositivo Desconectado
          </h1>

          <form onSubmit={handleLinkDevice}>
            <div className="space-y-6 flex-col">
              <div>
                <Label className="text-start">
                  Dispositivo ID <span className="text-error-500">*</span>{" "}
                </Label>
                <Input
                  placeholder="Digite o ID do dispositivo"
                  onChange={(e) => setDeviceId(e.target.value)}
                  id="device_id"
                  name="device_id"
                  required
                />
              </div>
              <div>
                <Label className="text-start">
                  Chave secreta <span className="text-error-500">*</span>{" "}
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Digite a secret do dispositivo"
                    onChange={(e) => setDeviceSecret(e.target.value)}
                    id="device_secret"
                    name="device_secret"
                    required
                  />
                </div>
              </div>

              <div>
                <Button className="w-full" size="sm" loading={connecting}>
                  Conectar
                </Button>
              </div>
            </div>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-170px)] items-center justify-center p-4 gap-4">
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-5xl">
        {/* 🎧 Áudio Player */}
        <div className="flex-1 rounded-lg bg-white dark:bg-gray-900 shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            🎧 Áudio em Tempo Real (Simulado)
          </h2>

          {/* 🎙️ Player de áudio */}
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={togglePlay}
              className="text-5xl text-blue-600 dark:text-blue-400 hover:scale-110 transition"
            >
              {playing ? <MdPause /> : <MdPlayArrow />}
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            {playing
              ? "Reproduzindo áudio"
              : "Áudio pausado"}
          </p>
        </div>

        {/* 🚨 Alertas */}
        <div className="flex-1 rounded-lg bg-white dark:bg-gray-900 shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            🚨 Alertas Recentes
          </h2>
          <div className="h-64 overflow-y-auto border rounded p-2 bg-gray-50 dark:bg-gray-800">
            {alerts.length === 0 ? (
              <p className="text-gray-500">Nenhum alerta recebido ainda.</p>
            ) : (
              alerts.map((a) => (
                <div
                  key={a.id}
                  className="p-2 mb-1 rounded bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
                >
                  <strong>{a.type}</strong>: {a.message}{" "}
                  <span className="text-xs text-gray-500">({a.timestamp})</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 🔴 Botão para desconectar */}
      <Button
        className="w-full md:max-w-md bg-red-600 hover:bg-red-700"
        onClick={() => {
          handleUnlinkDevice()
          stopFakeAudio();
          setPlaying(false);
        }}
      >
        Desconectar
      </Button>
    </div>
  );
}
