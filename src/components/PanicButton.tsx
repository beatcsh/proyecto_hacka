import React, { useState, useEffect } from 'react';
import { IonButton, IonAlert } from '@ionic/react';

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
      <IonButton
        expand="full"
        color="danger"
        onClick={countdown === null ? handlePanicButtonClick : openCancelAlert}
      >
        {countdown === null ? 'Botón de Pánico' : `Cancelar (${countdown})`}
      </IonButton>

      <IonAlert
        isOpen={showCancelAlert}
        onDidDismiss={() => setShowCancelAlert(false)}
        header={'Cancelar Alerta'}
        message={'¿Estás seguro de que quieres cancelar la alerta de pánico?'}
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              setShowCancelAlert(false);
            },
          },
          {
            text: 'Sí',
            handler: handleCancel,
          },
        ]}
      />

      <IonAlert
        isOpen={showSentAlert}
        onDidDismiss={() => setShowSentAlert(false)}
        header={'Mensaje Listo'}
        message={'Se ha preparado el mensaje en WhatsApp, por favor envíalo manualmente.'}
        buttons={[{ text: 'Aceptar', handler: () => setShowSentAlert(false) }]}
      />

      <IonAlert
        isOpen={showErrorAlert}
        onDidDismiss={() => setShowErrorAlert(false)}
        header={'Error'}
        message={'No se pudo preparar el mensaje o obtener la ubicación. Verifica los permisos o intenta más tarde.'}
        buttons={[{ text: 'Aceptar', handler: () => setShowErrorAlert(false) }]}
      />
    </>
  );
};

export default PanicButton;
