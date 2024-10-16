import React from 'react';
import './index.css';
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { home, add } from 'ionicons/icons';
import Home from './pages/Home';
import AddZone from './pages/AddZone';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

const App: React.FC = () => (
  <IonApp className='bg-black'>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact={true} />
          <Route path="/add-zone" component={AddZone} exact />
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" className='h-[70px] flex justify-between place-items-center mx-auto space-x-8'>
          <IonTabButton className='font-semibold' tab="home" href="/home">
            <i className='bx bxs-home text-2xl text-white' ></i>
          </IonTabButton>
          <IonTabButton className='font-semibold' tab="add-zone" href="/add-zone">
            <i className='bx bxs-location-plus text-2xl text-white'></i>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
