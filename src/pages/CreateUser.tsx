import React, { useState } from 'react';
import { createActor } from '../hello_world'; // Importa tu actor
import { HttpAgent } from '@dfinity/agent'; // Usa HttpAgent
import { useHistory } from 'react-router-dom'; // Importa useHistory

const CreateUser: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [emergencyTelephone, setEmergencyTelephone] = useState('');
    const [message, setMessage] = useState(''); // Para mostrar el mensaje del canister
    const history = useHistory(); // Inicializa useHistory

    const handleSubmit = async () => {
        try {
            const agentHost = import.meta.env.VITE_HTTP_AGENT_HOST;
            const canisterId = import.meta.env.VITE_CANISTER_ID_HELLO_WORLD;

            const agent = new HttpAgent({ host: agentHost });
            const userActor = createActor(canisterId, { agent });

            // Llama al método de creación de usuarios pasando los parámetros
            const result = await userActor.createUser(username, email, password, telephone, emergencyTelephone);
            setMessage(result); // Almacena el mensaje devuelto

            // Redirige a / si el usuario se creó exitosamente
            if (result.includes('Usuario') || result.includes('creado')) {
                history.push('/'); // Redirige a la pantalla de inicio
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            setMessage('Error al crear el usuario');
        }
    };

    return (
        <>
            <div className="h-[100vh] bg-fondogris flex flex-col justify-center place-items-center w-full space-y-6">
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3VoQ1wFuU_Y5XobaGUgkDS1ktWwEx3YeEdw&s" alt="Avatar" />
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="Nombre de Usuario"
                    className="input input-bordered w-full max-w-xs bg-white text-gray-900"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered w-full max-w-xs bg-white text-gray-900"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="input input-bordered w-full max-w-xs bg-white text-gray-900"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Telefono"
                    className="input input-bordered w-full max-w-xs bg-white text-gray-900"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Telefono Emergencia"
                    className="input input-bordered w-full max-w-xs bg-white text-gray-900"
                    value={emergencyTelephone}
                    onChange={(e) => setEmergencyTelephone(e.target.value)}
                />
                <button
                    className="btn bg-blue-800 text-white font-bold w-[80%]"
                    onClick={handleSubmit}
                >
                    Crear Cuenta
                </button>
                {message && <p className="text-green-600">{message}</p>} {/* Muestra el mensaje */}
            </div>
        </>
    );
};

export default CreateUser;
