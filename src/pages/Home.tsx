import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

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
    coordinates: number[];
  };
  dangerLevel: string;
  description: string;
}

const Home: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const [zones, setZones] = useState<Zone[]>([]);

  useEffect(() => {
    const fetchDangerZones = async () => {
      try {
        const response = await fetch('http://localhost:3000/zones');
        if (!response.ok) {
          throw new Error('Error al obtener zonas peligrosas');
        }
        const data = await response.json();
        setZones(data);
      } catch (error) {
        console.error(error);
      }
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
