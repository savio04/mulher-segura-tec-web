"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useDevice } from "@/context/DeviceContext";
import { MdWifiOff } from "react-icons/md";

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
})

const Location: React.FC = () => {
  const basePosition: [number, number] = [-3.6932686, -40.3558235] // UFC
  const [position, setPosition] = useState<[number, number]>(basePosition);
  const { connected } = useDevice()

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(() => {
        const offsetLat = (Math.random() - 0.5) * 0.001; // +/- 0.0005 graus ~ 50m
        const offsetLng = (Math.random() - 0.5) * 0.001;

        const newLat = basePosition[0] + offsetLat;
        const newLng = basePosition[1] + offsetLng;

        return [newLat, newLng];
      });
    }, 3000); // atualiza a cada 3 segundos

    return () => clearInterval(interval);
  }, [basePosition]);

  return (
    <>
      {
        connected ? (
          <div className="h-[calc(100vh-165px)] w-full" >
            <MapContainer center={basePosition} zoom={15} className="h-full w-full rounded-lg overflow-hidden">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>Movendo perto da posição inicial!</Popup>
              </Marker>
            </MapContainer>
          </div >
        ) : (
          <div className="flex w-full items-center justify-center p-4 h-[calc(100vh-170px)]">
            <div className="rounded-lg p-8 max-w-sm w-full text-center">
              <MdWifiOff className="mx-auto mb-4 text-red-500" size={72} />

              <h1 className="mb-6 font-semibold text-gray-800 dark:text-white/90">
                Dispositivo Desconectado
              </h1>

            </div>

          </div>
        )}
    </>
  )
}

export default Location;
