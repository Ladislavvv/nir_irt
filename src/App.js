import React from 'react';

import './App.css';
import './scss/app.scss';
import IrtBLock from './components/IrtBlock';
import SideBar from './components/sideBarBlock';
import Termopara from './components/Termopara/Termopara';

export const MillivoltsContext = React.createContext('');

function App() {
  const [millivolts, setMillivolts] = React.useState('');

  return (
    <MillivoltsContext.Provider value={millivolts}>
      <div className="App">
        <div className="wrapper">
          <SideBar />
          <IrtBLock />
          <Termopara />
        </div>
      </div>
    </MillivoltsContext.Provider>
  );
}

export default App;
