// src/components/PanicButton.tsx
import React, { useState } from 'react';
import { IonButton, IonAlert } from '@ionic/react';

const PanicButton: React.FC = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false); // Controla la visibilidad de la alerta
  const [messageSent, setMessageSent] = useState<boolean>(false); // Controla si el mensaje se envió

  const handlePanicButtonClick = () => {
    // Cuando se presiona el botón, mostrar alerta
    setShowAlert(true);
  };

  const sendAlert = () => {
    // Aquí es donde enviarías la alerta. Por ahora solo muestra un mensaje.
    console.log('Alerta de pánico enviada a contacto de confianza');
    setMessageSent(true);
    setShowAlert(false); // Oculta la alerta
  };

  return (
    <>
      <IonButton expand="full" color="danger" onClick={handlePanicButtonClick}>
        Botón de Pánico
      </IonButton>
      <IonAlert
        isOpen={showAlert} // Si la alerta está abierta
        onDidDismiss={() => setShowAlert(false)} // Al cerrar, oculta la alerta
        header={messageSent ? 'Alerta Enviada' : 'Confirmar Alerta'}
        message={messageSent ? 'Se ha enviado una alerta a tu contacto de confianza.' : '¿Estás seguro de que quieres enviar una alerta de pánico?'}
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              setShowAlert(false); // Al cancelar, oculta la alerta
            }
          },
          {
            text: 'Confirmar',
            handler: sendAlert // Al confirmar, envía la alerta
          }
        ]}
      />
    </>
  );
};

export default PanicButton;

