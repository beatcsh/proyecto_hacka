import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput } from '@ionic/react';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 21.9311352,
  lng: -102.2662378,
};

const AddZone: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'TU_API_KEY', // Agrega tu API Key aquí
  });

  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [dangerLevel, setDangerLevel] = useState('');
  const [description, setDescription] = useState('');

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    setMarker({
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
    });
  };

  const handleSubmit = async () => {
    if (!marker || !dangerLevel || !description) return;

    const newZone = {
      location: { type: 'Point', coordinates: [marker.lng, marker.lat] },
      dangerLevel,
      description,
    };

    await fetch('http://localhost:3000/zones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newZone),
    });

    // Limpia el formulario
    setMarker(null);
    setDangerLevel('');
    setDescription('');
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
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center} onClick={handleMapClick}>
          {marker && <Marker position={marker} />}
        </GoogleMap>

        <IonInput
          value={dangerLevel}
          placeholder="Nivel de peligro"
          onIonChange={(e) => setDangerLevel(e.detail.value!)}
        />
        <IonInput
          value={description}
          placeholder="Descripción"
          onIonChange={(e) => setDescription(e.detail.value!)}
        />
        <IonButton expand="full" onClick={handleSubmit}>
          Agregar Zona
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddZone;
