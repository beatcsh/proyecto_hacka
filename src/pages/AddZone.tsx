import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { IonButton, IonInput, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
  backgroundColor: 'black'
};

const center = {
  lat: 21.9311352,
  lng: -102.2662378,
};

// Rutas de íconos personalizados para cada nivel de peligro
const dangerIcons: { [key: string]: string } = {
  low: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',      // Peligro bajo
  medium: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',  // Peligro medio
  high: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',       // Peligro alto
  default: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png' // Peligro predeterminado
};


const AddZone: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dangerLevel, setDangerLevel] = useState<string>('low');
  const [description, setDescription] = useState<string>('');

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

  const handleSubmit = async () => {
    if (selectedLocation) {
      const zoneData = {
        location: {
          type: 'Point',
          coordinates: [selectedLocation.lng, selectedLocation.lat],
        },
        dangerLevel,
        description,
      };

      try {
        const response = await fetch('http://localhost:3000/add-zone', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(zoneData),
        });

        if (!response.ok) {
          throw new Error('Error al agregar la zona');
        }

        // Reset form
        setDangerLevel('');
        setDescription('');
        setSelectedLocation(null);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='w-full h-[110px] m-3'>
            <h1 className='p-4 text-2xl font-semibold'>Reportar Zona</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-no-padding">
        <div className='w-full h-[100%] p-2 bg-black'>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={center}
            onClick={handleMapClick}
          >
            {selectedLocation && (
              <Marker
                position={selectedLocation}
                // Cambia el ícono según el nivel de peligro
                icon={dangerIcons[dangerLevel] || dangerIcons.default}
              />
            )}
          </GoogleMap>
        </div>
      </IonContent>
      <div className='grid place-items-center h-[210px]'>
        <IonInput
          className='border rounded-lg p-2 text-sm bg-black'
          value={dangerLevel}
          placeholder="Nivel de Peligro (low, medium, high)"
          onIonChange={e => setDangerLevel(e.detail.value!)}
        />
        <IonInput
          className='border rounded-lg p-2 text-sm bg-black'
          value={description}
          placeholder="Descripción"
          onIonChange={e => setDescription(e.detail.value!)}
        />
        <IonButton color='success' onClick={handleSubmit}><p className='text-sm m-2'>Agregar Zona</p></IonButton>
      </div>
    </IonPage>
  );
};

export default AddZone;
