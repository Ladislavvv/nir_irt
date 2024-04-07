import React from 'react';
import './style.scss';

function Termopara() {
  const [temperature, setTemperature] = React.useState('');
  // const [query, setQuery] = React.useState("");
  const [millivolts, setMillivolts] = React.useState('');
  // const mVcontext = React.useContext(MillivoltsContext);

  const handleTemperatureChange = (event) => {
    const celsius = event.target.value;
    // setQuery(celsius);
    setTemperature(celsius);
    setMillivolts(convertCelsiusToMillivolts(celsius));
  };

  React.useEffect(() => {
    console.log(millivolts);
  }, [millivolts])
  
  const convertCelsiusToMillivolts = (celsius) => {
    celsius = Number(celsius);
    let mV = 0;
    const mVoltRange = [4, 20];
    const celsiusRange = [0, 600];

    if (celsius > celsiusRange[1]) return '20';
    if (celsius < celsiusRange[0]) return '0';

    const keff = celsiusRange[1] / (mVoltRange[1] - mVoltRange[0]);
    mV = (celsius / keff + mVoltRange[0]).toFixed(3);
    return mV;
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
