import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { IonButton, IonInput, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 21.9311352,
  lng: -102.2662378,
};

const AddZone: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dangerLevel, setDangerLevel] = useState<string>('');
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
          <IonTitle>Agregar Zona Peligrosa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          onClick={handleMapClick}
        >
          {selectedLocation && (
            <Marker
              position={selectedLocation}
            />
          )}
        </GoogleMap>
        <IonInput 
          value={dangerLevel} 
          placeholder="Nivel de Peligro" 
          onIonChange={e => setDangerLevel(e.detail.value!)} 
        />
        <IonInput 
          value={description} 
          placeholder="Descripción" 
          onIonChange={e => setDescription(e.detail.value!)} 
        />
        <IonButton onClick={handleSubmit}>Agregar Zona</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddZone;
