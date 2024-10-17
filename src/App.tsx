import React from 'react';
import './index.css';
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import AddZone from './pages/AddZone';
import Login from './pages/Login';
import Start from './pages/Start';
import CreateUser from './pages/CreateUser';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

const App: React.FC = () => (
  <IonApp className='bg-fondogris'>
    <IonReactRouter>
      <IonTabs>


        <IonRouterOutlet>
          <Route path="/" component={Start} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/home" component={Home} exact={true} />
          <Route path="/add-zone" component={AddZone} exact />
          <Route path="/createUser" component={CreateUser} exact />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" className='h-[70px] bg-fondogris flex justify-between place-items-center mx-auto space-x-8'>
          <IonTabButton className='font-semibold' tab="logout" href="/">
            <i className='bx bx-chevron-left text-5xl text-titulos'></i>
          </IonTabButton>
          <IonTabButton className='font-semibold' tab="home" href="/home">
            <i className='bx bxs-home text-3xl text-titulos' ></i>
          </IonTabButton>
          <IonTabButton className='font-semibold' tab="add-zone" href="/add-zone">
            <i className='bx bxs-location-plus text-3xl text-titulos'></i>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
