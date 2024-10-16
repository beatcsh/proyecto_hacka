import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const mapContainerStyle = {
    width: '90%',
    height: '90%',
    borderRadius: '15px'
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

// Define los iconos para cada nivel de peligro
const dangerIcons: { [key: string]: string } = {
    low: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',       // Bajo peligro
    medium: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',    // Medio peligro
    high: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',         // Alto peligro
    default: 'http://maps.google.com/mapfiles/kml/pal4/icon28.png'        // Signo de exclamación
};

const Home: React.FC = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    });

    const [zones, setZones] = useState<Zone[]>([]);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null); // Estado para el marcador seleccionado

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
                    <IonTitle className='w-full h-[100px] m-3'>
                        <h1 className='p-4 text-2xl font-semibold'>Mapa de Zonas Peligrosas</h1>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='w-full h-[100%] grid place-items-center bg-black'>
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
                                icon={dangerIcons[zone.dangerLevel] || dangerIcons.default} // Asigna el icono según el nivel de peligro
                                onClick={() => setSelectedZone(zone)} // Al hacer clic en el marcador, se selecciona la zona
                            />
                        ))}
                        {selectedZone && (
                            <InfoWindow
                                position={{
                                    lat: selectedZone.location.coordinates[1],
                                    lng: selectedZone.location.coordinates[0],
                                }}
                                onCloseClick={() => setSelectedZone(null)} // Cierra el InfoWindow al hacer clic
                            >
                                <div>
                                    <h4>Nivel de Peligro: {selectedZone.dangerLevel}</h4>
                                    <p>{selectedZone.description}</p> {/* Muestra la descripción de la zona */}
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
