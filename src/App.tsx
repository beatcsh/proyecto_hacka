import React from 'react';
import './index.css';
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import AddZone from './pages/AddZone';
import Login from './pages/Login';
import Start from './pages/Start';
import CreateUser from './pages/CreateUser';
import Panico from './pages/Panico';
import { IonReactRouter } from '@ionic/react-router';
import PanicButton from './components/BotonPanico';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

const App: React.FC = () => (
  <IonApp className='bg-fondogris'>
    <IonReactRouter>
      <IonTabs>

        <IonRouterOutlet>
          <Route exact path="/" render={() => <Redirect to="/start" />} />
          <Route exact path="/start" component={Start} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/addzone" component={AddZone} />
          <Route exact path="/createUser" component={CreateUser} />
          <Route exact path="/panico" component={Panico} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" className='h-[70px] bg-fondogris flex justify-between place-items-center mx-auto space-x-8 join'>
          <IonTabButton className='font-semibold join-item btn bg-fondogris border-0' tab="logout" href="/">
            <i className='bx bx-log-out text-3xl text-titulos'></i>
          </IonTabButton>
          <IonTabButton className='font-semibold join-item btn bg-fondogris border-0' tab="home" href="/home">
            <i className='bx bxs-home text-3xl text-titulos' ></i>
          </IonTabButton>
          <IonTabButton className='font-semibold join-item btn bg-fondogris border-0' tab="add-zone" href="/addzone">
            <i className='bx bx-current-location text-3xl text-titulos'></i>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
