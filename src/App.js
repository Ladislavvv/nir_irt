import React from 'react';

import './App.css';
import './scss/app.scss';
import IrtBLock from './components/IrtBlock';
import SideBar from './components/sideBarBlock';
import Termopara from './components/Termopara/';
import { TermoparaTypes } from './data/data';

export const MilliAmpersContext = React.createContext();

function App() {
  const [milliAmpers, setMilliAmpers] = React.useState(4);
  const [isConnected, setIsConnected] = React.useState(true);

  return (
    <MilliAmpersContext.Provider value={milliAmpers}>
      <div className="App">
        <div className="wrapper">
          <SideBar />
          <IrtBLock
          isConnected={isConnected}
          TermoparaTypes={TermoparaTypes}
          />
          <Termopara
            setMilliAmpers={setMilliAmpers}
            isConnected={isConnected}
            setIsConnected={setIsConnected}
            TermoparaTypes={TermoparaTypes}
          />
        </div>
      </div>
    </MilliAmpersContext.Provider>
  );
}

export default App;
