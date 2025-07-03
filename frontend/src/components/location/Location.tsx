"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
})

const Location: React.FC = () => {
  const position: [number, number] = [-3.6932686, -40.3558235] // UFC

  return (
    <div className="h-[calc(100vh-170px)] w-full">
      <MapContainer center={position} zoom={13} className="h-full w-full rounded-lg overflow-hidden">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Aqui está você!</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Location;
