import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import * as dotenv from 'dotenv';
dotenv.config();

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 21.9311352,
  lng: -102.2662378,
};

// Define la interfaz para la zona
interface Zone {
  location: {
    coordinates: number[]; // Asegúrate de que coincida con la estructura que devuelve tu API
  };
  dangerLevel: string;
  description: string;
}

const Home: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '', // Agrega tu API Key aquí
  });

  const [zones, setZones] = useState<Zone[]>([]); // Especifica el tipo aquí

  useEffect(() => {
    const fetchDangerZones = async () => {
      const response = await fetch('http://localhost:3000/zones');
      if (!response.ok) {
        throw new Error('Error al obtener zonas peligrosas');
      }
      const data = await response.json();
      setZones(data);
    };

    fetchDangerZones();
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mapa de Zonas Peligrosas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
        >
          {zones.map((zone, index) => (
            <Marker
              key={index}
              position={{
                lat: zone.location.coordinates[1],
                lng: zone.location.coordinates[0],
              }}
            />
          ))}
        </GoogleMap>
      </IonContent>
    </IonPage>
  );
};

export default Home;
