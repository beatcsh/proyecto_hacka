import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importar los estilos de Leaflet
import L from 'leaflet';
import { Zone } from './types'; // Asegúrate de que la ruta sea correcta

const Home: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>([]); // Definición de tipo para el estado

  useEffect(() => {
    const fetchDangerZones = async () => {
      const response = await fetch('http://localhost:3000/zones'); // Cambia esto según tu backend
      const data = await response.json();
      setZones(data); // Almacena las zonas peligrosas en el estado
    };

    fetchDangerZones();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <p className='text-4xl font-bold text-blue-700'>Mapa de Peligro</p>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mapa de Peligro</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />

        {/* Aquí se inserta el componente del mapa */}
        <MapContainer
          center={[21.9311352, -102.2662378]} // Centro inicial
          zoom={13}
          style={{ height: '100vh', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />

          {/* Mostrar marcadores o polígonos para cada zona peligrosa */}
          {zones.map((zone, index) => (
            zone.location.type === "Point" ? (
              <Marker
                key={index}
                position={[zone.location.coordinates[1], zone.location.coordinates[0]]} // Asegúrate de que sea [latitud, longitud]
                icon={L.icon({
                  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
                  iconSize: [38, 95],
                  popupAnchor: [0, -15],
                })}
              >
                <Popup>
                  <b>Peligro:</b> {zone.dangerLevel} <br />
                  <b>Descripción:</b> {zone.description}
                </Popup>
              </Marker>
            ) : (
              <Polygon
                key={index}
                positions={zone.location.coordinates} // Asegúrate de que sean las coordenadas correctas
                color="red"
              >
                <Popup>
                  <b>Peligro:</b> {zone.dangerLevel} <br />
                  <b>Descripción:</b> {zone.description}
                </Popup>
              </Polygon>
            )
          ))}
        </MapContainer>
      </IonContent>
    </IonPage>
  );
};

export default Home;
