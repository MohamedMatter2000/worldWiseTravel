/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useState } from "react";
import Button from "./Button";
import { useCities } from "../contexts/CitesContexts";
import { useEffect } from "react";
import useGeolocation from "../hook/useGeolocation";
import { useUrlpositon } from "../hook/useUrlposition";
export default function Map() {
  const navigate = useNavigate();
  const [mapPosition, setmapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingpositon,
    position: geolocationposition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlpositon();
  useEffect(
    function () {
      if (mapLat && mapLng) setmapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  useEffect(
    function () {
      if (geolocationposition)
        setmapPosition([geolocationposition.lat, geolocationposition.lng]);
    },
    [geolocationposition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationposition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingpositon ? "Loading..." : "Use Your Position "}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        className={styles.map}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
