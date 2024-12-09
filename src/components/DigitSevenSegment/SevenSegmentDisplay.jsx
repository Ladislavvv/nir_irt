import React from 'react';
import './style.scss';
import SevenSegmentDigit from './SevenSegmentDigit';
import { TermoparaTypes } from '../../data/data';

function SevenSegmentDisplay(props) {
  const [numArr, setNumArr] = React.useState(['0', '0', '0', '0']);
  const milliAmpers = props.milliAmpers || 4;
  const howManyBits = props.howManyBits || 0;
  const displaySize = props.size;
  const irtGrad = props.curGrad;
  const temperatura = convertMilliAmpersToCelsius(milliAmpers, irtGrad);

  React.useEffect(() => {
    let dotIndex;
    if (temperatura.includes('.')) dotIndex = temperatura.indexOf('.');
    let result = temperatura.substring(0, dotIndex).split('');
    result = replaceWithDot(result);
    const bits = getFractionalPart(temperatura).split('');
    let ttt = [];
    ttt = formatData(result, bits, howManyBits);
    setNumArr(ttt);
  }, [temperatura, howManyBits]);

  function formatData(arr, bits, howManyBits) {
    let newArr = [...arr];
    for (let i = 0; i < howManyBits; i++) {
      newArr.push(bits[i]);
      if (newArr.length === 4) return newArr;
    }
    while (newArr.length < 4) {
      newArr.unshift('');
    }
    return newArr;
  }

  function convertMilliAmpersToCelsius(mA, gradType) {
    const thermocouple = TermoparaTypes.find(type => type.name === gradType);
    if (!thermocouple) return String((0).toFixed(3));

    const minTemp = thermocouple.data[0].temp;
    const maxTemp = thermocouple.data[thermocouple.data.length - 1].temp;

    const mAClamped = Math.min(Math.max(mA, 4), 20);

    const tempRatio = (mAClamped - 4) / (20 - 4);
    const temperature = minTemp + (maxTemp - minTemp) * tempRatio;

    return String(Math.min(Math.max(temperature, minTemp), 600).toFixed(3));
  }

  function getFractionalPart(str) {
    const parts = str.split('.');
    return parts.length > 1 ? parts[1] : '';
  }

  function replaceWithDot(mass) {
    let arr = mass;
    const temp = arr[arr.length - 1];
    arr[arr.length - 1] = `${temp}.`;
    return arr;
  }

  return (
    <div className={`display${displaySize === 'small' ? '-small' : ''}`}>
      {numArr.map((num, i) => {
        return <SevenSegmentDigit key={i} value={num} displaySize={displaySize} />;
      })}
    </div>
  );
}

export default SevenSegmentDisplay;
