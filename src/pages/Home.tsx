import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import { IonPage } from '@ionic/react';
import { createActor } from '../hello_world'; // Asegúrate de importar el actor correcto
import { HttpAgent } from '@dfinity/agent'; // Usa HttpAgent
import PanicButton from '../components/BotonPanico';

const mapContainerStyle = {
    width: '90%',
    height: '400px',
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

    // Rutas de íconos personalizados para cada nivel de peligro
    const dangerIcons: { [key: string]: string } = {
        low: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',      // Peligro bajo
        medium: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',  // Peligro medio
        high: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',       // Peligro alto
        default: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png' // Peligro predeterminado
    };

    const [zones, setZones] = useState<Zone[]>([]);
    const [canisterMessage, setCanisterMessage] = useState<string>(''); // Estado para el mensaje del canister
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

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

    if (!isLoaded) return <div className='w-[full] h-[100vh] grid place-items-center'><span className="loading loading-infinity loading-lg"></span></div>;

    return (
        <IonPage className='bg-fondogris'>
            <div className='h-auto grid grid-cols-[70px,3fr] p-2 shadow-3xl gap-8'>
                <div className='grid place-items-center'>
                    <div className="avatar w-[60px]">
                        <div className="rounded-full">
                            <img src="../assets/logo.png" />
                        </div>
                    </div>
                </div>
                <h1 className='p-4 text-2xl font-semibold'>
                    SafeGirl
                </h1>
            </div>

            <div className='w-full my-3 flex flex-col place-items-center space-y-6 bg-fondogris'>
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
                <div className='w-16'>
                    <PanicButton />
                </div>
            </div>
        </IonPage>
    );
};

export default Home;
