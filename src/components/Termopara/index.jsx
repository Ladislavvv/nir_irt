import React from 'react';
import './style.scss';

const GRADUATIONS = {
  HK: { range: [4, 20], tempRange: [0, 600] },
  HA: { range: [4, 20], tempRange: [-200, 1200] },
  PP: { range: [4, 20], tempRange: [0, 1500] },
};

function Termopara({ setMillivolts, setIsConnected, isConnected, setGradType }) {
  const [temperature, setTemperature] = React.useState('');
  const [graduationLeft, setGraduationLeft] = React.useState('HK');
  const [graduationRight, setGraduationRight] = React.useState('HK');

  const handleGraduationChange = (newGraduation, side) => {
    if (side.toLowerCase() === 'left') {
      setGraduationLeft(newGraduation);
    } else setGraduationRight(newGraduation);
  };

  React.useEffect(() => {
    setMillivolts(convertCelsiusToMillivolts(temperature));
  }, [graduationLeft, graduationRight]);

  const handleTemperatureChange = (event) => {
    const celsius = event.target.value;
    setTemperature(celsius);
    setMillivolts(convertCelsiusToMillivolts(celsius));
  };

  const handleClickBtn = () => {
    setIsConnected(!isConnected);
  };

  const calcMv = () => {};

  const convertCelsiusToMillivolts = (cel) => {
    if (graduationLeft === graduationRight) return 4;

    let temp = Number(cel);

    let gradType;
    if (graduationLeft === 'HK' && graduationRight === 'HA') gradType = 'HK';
    if (graduationLeft === 'HA' && graduationRight === 'HK') gradType = 'HK';

    if (graduationLeft === 'PP' && graduationRight === 'HA') gradType = 'HA';
    if (graduationLeft === 'HA' && graduationRight === 'PP') gradType = 'HA';

    if (graduationLeft === 'PP' && graduationRight === 'HK') gradType = 'PP';
    if (graduationLeft === 'HK' && graduationRight === 'PP') gradType = 'PP';
    console.log(gradType);

    const { range, tempRange } = GRADUATIONS[gradType];
    const [mVoltMin, mVoltMax] = range;
    const [tempMin, tempMax] = tempRange;

    // if (temp < 0) return String(mVoltMin.toFixed(3));
    // if (temp > 600) return String(mVoltMax.toFixed(3));

    const keff1 = (tempMax - tempMin) / (mVoltMax - mVoltMin);
    const mV1 = (temp / keff1 + mVoltMin).toFixed(3);
    console.log(mV1);
    return String(mV1);

    // let temp = Number(cel);

    // const { range, tempRange } = GRADUATIONS[graduationLeft];
    // const [mVoltMin, mVoltMax] = range;
    // const [tempMin, tempMax] = tempRange;

    // if (temp > tempMax) return String(mVoltMax.toFixed(3));
    // if (temp < tempMin) return String(mVoltMin.toFixed(3));

    // const keff = tempMax / (mVoltMax - mVoltMin);
    // return String((temp / keff + mVoltMin).toFixed(3));

    // let celsius = Number(cel);
    // let mV = 0;
    // const mVoltRange = [4, 20];
    // const celsiusRange = [0, 600];
    // if (celsius > celsiusRange[1]) return String(mVoltRange[1].toFixed(3));
    // if (celsius < celsiusRange[0]) return String(mVoltRange[0].toFixed(3));
    // const keff = celsiusRange[1] / (mVoltRange[1] - mVoltRange[0]);
    // mV = (celsius / keff + mVoltRange[0]).toFixed(3);
    // console.log(mV)
    // return String(mV);
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
        <div className="title">1</div>
        {Object.keys(GRADUATIONS).map((grad) => (
          <button
            key={grad}
            className={`graduation-btn ${graduationLeft === grad ? 'active' : ''}`}
            onClick={() => handleGraduationChange(grad, 'left')}>
            {grad}
          </button>
        ))}
      </div>

      <div className="termopara-graduation-buttons">
        <div className="title">2</div>
        {Object.keys(GRADUATIONS).map((grad) => (
          <button
            key={grad}
            className={`graduation-btn ${graduationRight === grad ? 'active' : ''}`}
            onClick={() => handleGraduationChange(grad, 'right')}>
            {grad}
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
