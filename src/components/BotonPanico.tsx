import React, { useState, useEffect } from 'react';

const PanicButton: React.FC = () => {
    const [countdown, setCountdown] = useState<number | null>(null);
    const [showCancelAlert, setShowCancelAlert] = useState<boolean>(false);
    const [showSentAlert, setShowSentAlert] = useState<boolean>(false);
    const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handlePanicButtonClick = () => {
        console.log("Botón de pánico presionado. Iniciando cuenta regresiva...");

        if (countdown === null) {
            setCountdown(10);
            const id = setTimeout(() => {
                sendAlert();
            }, 10000);
            setTimeoutId(id);
        }
    };

    const sendAlert = () => {
        const phoneNumber = '524494593965'; // Número de teléfono con código de país (México = 52)

        // Obtener la ubicación actual
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;

                    // Enlace de Google Maps con la ubicación actual
                    const locationUrl = `https://www.google.com/maps?q=${lat},${long}`;

                    // Mensaje de emergencia con la ubicación
                    const message = `¡Ayuda! He enviado una alerta de pánico. Mi ubicación actual es: ${locationUrl}`;

                    console.log(`Intentando enviar mensaje por WhatsApp a ${phoneNumber}: ${message}`);

                    // Enlace para enviar por WhatsApp
                    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

                    // Abrir la URL en una nueva ventana o pestaña
                    window.open(whatsappUrl, '_blank'); // '_blank' abre en una nueva pestaña
                    setShowSentAlert(true);
                    console.log('Mensaje de WhatsApp preparado con éxito.');
                    console.log(whatsappUrl)
                },
                (error) => {
                    console.error('Error obteniendo la ubicación: ', error);
                    setShowErrorAlert(true); // Mostrar alerta si hay error en la geolocalización
                }
            );
        } else {
            console.error('La geolocalización no está disponible en este navegador.');
            setShowErrorAlert(true); // Mostrar alerta si la geolocalización no está disponible
        }

        setCountdown(null); // Restablecer la cuenta regresiva
        if (timeoutId) {
            clearTimeout(timeoutId); // Limpiar el timeout
        }
    };

    const handleCancel = () => {
        if (timeoutId) {
            clearTimeout(timeoutId); // Cancelar el timeout si está activo
        }
        setCountdown(null); // Restablecer la cuenta regresiva
        setShowCancelAlert(false); // Cerrar el modal de cancelar
        console.log('Alerta de pánico cancelada.');
    };

    const openCancelAlert = () => {
        setShowCancelAlert(true); // Mostrar alerta de confirmación para cancelar
    };

    useEffect(() => {
        if (countdown !== null && countdown > 0) {
            const interval = setInterval(() => {
                setCountdown((prev) => {
                    const newCountdown = prev ? prev - 1 : 0;
                    console.log(`Contador: ${newCountdown}`);
                    return newCountdown;
                });
            }, 1000);

            return () => clearInterval(interval); // Limpiar intervalo cuando el componente se desmonte
        }
    }, [countdown]);

    return (
        <>
            <div className="avatar w-full" onClick={countdown === null ? handlePanicButtonClick : openCancelAlert}>
                <div className="ring-primary ring-offset-base-100 rounded-full ring ring-offset-2 animate-pulse relative">
                    <img src="../assets/logo.png" alt="Avatar" />
                    {countdown !== null && (
                        <span className="absolute inset-0 flex items-center justify-center text-black text-4xl font-bold">
                            {countdown}
                        </span>
                    )}
                </div>
            </div>

            {/* Modal para cancelar */}
            {showCancelAlert && (
                <div className="fixed h-[100vh] inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-fondogris p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Cancelar Alerta</h2>
                        <p className="mb-6">¿Estás seguro de que quieres cancelar la alerta de pánico?</p>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={handleCancel}
                            >
                                Sí, cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para error */}
            {showErrorAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-fondogris p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Error</h2>
                        <p className="mb-6">No se pudo obtener la ubicación. Verifica los permisos o intenta más tarde.</p>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => setShowErrorAlert(false)}
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para confirmación de mensaje enviado */}
            {showSentAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Mensaje Listo</h2>
                        <p className="mb-6">Se ha preparado el mensaje en WhatsApp. Por favor, envíalo manualmente.</p>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={() => setShowSentAlert(false)}
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PanicButton;