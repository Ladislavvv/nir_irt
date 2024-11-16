import React from 'react';
import './style.scss';

function Termopara({ setMillivolts, setIsConnected, isConnected }) {
  const [temperature, setTemperature] = React.useState('');

  const handleTemperatureChange = (event) => {
    const celsius = event.target.value;
    setTemperature(celsius);
    setMillivolts(convertCelsiusToMillivolts(celsius));
  };
  const handleClickBtn = () => {
    setIsConnected(!isConnected);
  };
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
      <button className="termopara-btn" onClick={() => handleClickBtn()}>
        {isConnected ? 'Разорвать соединение' : 'Восстановаить соединение'}
      </button>
    </div>
  );
}
export default Termopara;
