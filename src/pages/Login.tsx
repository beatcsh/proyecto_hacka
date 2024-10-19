import React, { useState } from 'react';
import { createActor } from '../hello_world'; // Importa tu actor
import { HttpAgent } from '@dfinity/agent'; // Usa HttpAgent
import { useHistory } from 'react-router-dom'; // Importa useHistory

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Para mostrar el mensaje del canister
    const history = useHistory(); // Inicializa useHistory

    const handleLogin = async () => {
        try {
            const agentHost = import.meta.env.VITE_HTTP_AGENT_HOST;
            const canisterId = import.meta.env.VITE_CANISTER_ID_HELLO_WORLD;

            const agent = new HttpAgent({ host: agentHost });
            const userActor = createActor(canisterId, { agent });

            // Llama al método de login pasando los parámetros
            const result = await userActor.login(username, password);

            // Manejar el resultado
            if (result.length > 0) {
                const userInfo = result[0]; // Supongamos que el primer elemento contiene los datos del usuario
                setMessage(`Inicio de sesión exitoso: ${userInfo.username}`); // Ajusta según la estructura de userInfo
                // Redirige a /home si el login es exitoso
                history.push('/home');
            } else {
                // Si el vector está vacío, significa que hubo un error en el inicio de sesión
                setMessage('Nombre de usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setMessage('Error al iniciar sesión');
        }
    };

    return (
        <>
            <div className="h-[100vh] bg-fondogris flex flex-col justify-center place-items-center w-full space-y-6">
                <div className="grid place-items-center space-y-6">
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                            <img src="../assets/logo.png" alt="Avatar" />
                        </div>
                    </div>
                    <p className="text-xl">Bienvenido una vez más</p>
                </div>
                <input
                    type="text"
                    placeholder="Nombre de Usuario"
                    className="input input-bordered w-full max-w-xs bg-white text-gray-900"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="input input-bordered w-full max-w-xs bg-white text-gray-900"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="btn bg-blue-800 text-white font-bold w-[80%]"
                    onClick={handleLogin}
                >
                    Iniciar Sesión
                </button>
                <a href='/createUser' className="btn bg-gray-200 text-gray-700 font-bold w-[80%]">
                    Crear Cuenta
                </a>
                {message && <p className="text-green-600">{message}</p>} {/* Muestra el mensaje */}
            </div>
        </>
    );
};

export default Login;
