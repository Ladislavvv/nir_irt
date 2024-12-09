import React from 'react';
import './style.scss';


function Termopara({ setMilliAmpers, setIsConnected, isConnected, TermoparaTypes }) {
  const [temperature, setTemperature] = React.useState('');

  const [curGrad, setCurGrad] = React.useState('HA');

  const handleGraduationChange = (newGraduation) => {
    setCurGrad(newGraduation);
  };

  React.useEffect(() => {
    setEDS();
  }, [curGrad, temperature]);

  const handleTemperatureChange = (event) => {
    const celsius = event.target.value;
    setTemperature(celsius);
  };

  const setEDS = () => {
    const mA = calcCelsiusToMA();
    setMilliAmpers(mA.toFixed(3));
  };

  const handleClickBtn = () => {
    setIsConnected(!isConnected);
  };

  const calcCelsiusToMA = () => {
    const thermocouple = TermoparaTypes.find(type => type.name === curGrad);
    if (!thermocouple) return 4;

    const temp = Number(temperature);
    if (isNaN(temp)) return 4;

    const minTemp = thermocouple.data[0].temp;
    const maxTemp = thermocouple.data[thermocouple.data.length - 1].temp;

    if (temp <= minTemp) return 4;
    if (temp >= maxTemp) return 20;

    const tempRatio = (temp - minTemp) / (maxTemp - minTemp);
    return 4 + (16 * tempRatio);
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

      <div className="termopara-graduation-buttons">
        {TermoparaTypes && TermoparaTypes.map((grad) => (
          <button
            key={grad.name}
            className={`graduation-btn ${curGrad === grad.name ? 'active' : ''}`}
            onClick={() => handleGraduationChange(grad.name)}>
            {grad.name}
          </button>
        ))}
      </div>

      <button className="termopara-btn" onClick={() => handleClickBtn()}>
        {isConnected ? 'Разорвать соединение' : 'Восстановаить соединение'}
      </button>

    </div>
  );
}
export default Termopara;