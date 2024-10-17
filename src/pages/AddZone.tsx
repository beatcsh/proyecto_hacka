import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { IonButton, IonInput, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const mapContainerStyle = {
  width: '100%',
  height: '95%',
  borderRadius: '10px'
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
        const response = await fetch('http://localhost:5000/add-zone', {
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
      <div className='w-full h-[110px] m-3'>
        <h1 className='p-4 text-2xl font-semibold'>Reportar Zona</h1>
      </div>
      <div className='w-full h-[100%] p-2 bg-fondogris'>
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
      </div>
      <div className='grid place-items-center h-[210px]'>
        <select
          onChange={e => setDangerLevel(e.target.value)}
          value={dangerLevel}
          className="select select-bordered w-[60%] bg-fondogris m-1 max-w-xs"
        >
          <option disabled selected>Nivel de Peligro</option>
          <option value="Low">Bajo</option>
          <option value="Medium">Medio</option>
          <option value="High">Alto</option>
          <option value="Critical">Urgente</option>
        </select>

        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="input input-bordered w-[60%] m-1 max-w-xs bg-fondogris text-white"
        />
        <button onClick={handleSubmit} className="btn bg-blue-800 text-white font-bold w-[60%] m-2">Agregar Zona</button>
      </div>
    </IonPage>
  );
};

export default AddZone;
