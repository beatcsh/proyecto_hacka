import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { canisterId, createActor } from '../dfx_generated/hello_world';
import { HttpAgent } from '@dfinity/agent';
import { useState, useEffect } from 'react';

const Home: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const agent = await HttpAgent.create({
                    host: "http://127.0.0.1:4943",
                });
                const canisterActor = createActor(canisterId, { agent });

                const response = await canisterActor.testMessage();
                setMessage(response);
            } catch (error) {
                console.error("Error al llamar a testMessage:", error);
                setMessage("Error al cargar el mensaje");
            } finally {
                setLoading(false);
            }
        };

        fetchMessage();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <p className='text-4xl font-bold text-blue-700'>
                            {loading ? "Cargando..." : message || "Blank"}
                        </p>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer />
            </IonContent>
        </IonPage>
    );
};

export default Home;