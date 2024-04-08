import React from 'react';
import './style.scss';
import {MillivoltsContext} from '../../App'

function Termopara({setMillivolts}) {
  const [temperature, setTemperature] = React.useState('');
  // const [query, setQuery] = React.useState("");
  // const [millivolts, setMillivolts] = React.useState('');
  const millivolts = React.useContext(MillivoltsContext);

  const handleTemperatureChange = (event) => {
    const celsius = event.target.value;
    // setQuery(celsius);
    setTemperature(celsius);
    setMillivolts(convertCelsiusToMillivolts(celsius));
  };

  // React.useEffect(() => {
  //   console.log('mV:', millivolts);
  // }, [millivolts])
  
  const convertCelsiusToMillivolts = (cel) => {
    let celsius = Number(cel);
    let mV = 0;
    const mVoltRange = [4, 20];
    const celsiusRange = [0, 600];

    if (celsius > celsiusRange[1]) return String(mVoltRange[1].toFixed(3));
    if (celsius < celsiusRange[0]) return String(mVoltRange[0].toFixed(3));

    const keff = celsiusRange[1] / (mVoltRange[1] - mVoltRange[0]);
    mV = (celsius / keff + mVoltRange[0]).toFixed(3);
    return String(mV);
  };
  return (
    <div className="termopara">
      <img className="termopara-img" src="/termopara.png" alt="Термопара" />
      <input
        className="termopara-input"
        type="number"
        value={temperature}
        onChange={handleTemperatureChange}
        placeholder="Введите температуру"
      />
    </div>
  );
}

export default Termopara;
