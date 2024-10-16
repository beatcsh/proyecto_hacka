import { HttpAgent, Actor } from '@dfinity/agent';

// URL del host y el canisterId
const CANISTER_ID = 'bd3sg-teaaa-aaaaa-qaaba-cai'; // Asegúrate de usar tu canister ID real
const CANISTER_URL = 'http://127.0.0.1:4943'; // O la URL correspondiente

// Configurar el agente HTTP
const agent = new HttpAgent({ host: CANISTER_URL });

// Creación de un actor genérico sin IDL
const actor = Actor.createActor({}, {
    agent,
    canisterId: CANISTER_ID,
});

// Función para invocar el método 'testMessage'
export const testMessage = async () => {
    try {
        // Invocamos la función de tu canister por nombre
        const message = await actor.testMessage();
        return message;
    } catch (error) {
        console.error('Error al obtener el mensaje:', error);
        throw error;
    }
};
