import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { createActor } from '../hello_world'; // Asegúrate de importar el actor correcto
import { HttpAgent } from '@dfinity/agent'; // Usa HttpAgent

const mapContainerStyle = {
    width: '90%',
    height: '90%',
    borderRadius: '15px',
};

const center = {
    lat: 21.9311352,
    lng: -102.2662378,
};

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
    const [canisterMessage, setCanisterMessage] = useState<string>(''); // Estado para el mensaje del canister

    useEffect(() => {
        const fetchCanisterMessage = async () => {
            try {
                // Verifica que las variables de entorno estén disponibles
                const agentHost = import.meta.env.VITE_HTTP_AGENT_HOST;
                const canisterId = import.meta.env.VITE_CANISTER_ID_HELLO_WORLD;

                if (!agentHost || !canisterId) {
                    throw new Error('Las variables de entorno no están configuradas correctamente.');
                }

                const agent = new HttpAgent({ host: agentHost });

                const canister = createActor(canisterId, { agent });

                console.log(agentHost + " / " + canisterId)

                const message = await canister.testMessage();
                setCanisterMessage(message);
            } catch (error) {
                console.error('Error al conectarse al canister:', error);
                setCanisterMessage('Error al conectarse al canister');
            }
        };

        fetchCanisterMessage(); // Llamar al canister al cargar el componente

        const fetchDangerZones = async () => {
            try {
                const response = await fetch('http://localhost:5000/zones');
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
        <IonPage className='bg-fondogris'>
            <div className='h-auto grid grid-cols-[1fr,3fr] p-2 shadow-3xl'>
                <div className='grid place-items-center'>
                    <div className="avatar w-[60px]">
                        <div className="rounded-full">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3VoQ1wFuU_Y5XobaGUgkDS1ktWwEx3YeEdw&s" />
                        </div>
                    </div>
                </div>
                <h1 className='p-4 text-2xl font-semibold'>
                    {canisterMessage ? canisterMessage : 'Cargando mensaje...'}
                </h1>
            </div>

            <div className='w-full h-[100%] grid place-items-center bg-fondogris'>
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
            </div>
        </IonPage>
    );
};

export default Home;
