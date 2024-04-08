import React from 'react';
import './style.scss';
import SevenSegmentDigit from './SevenSegmentDigit';

function SevenSegmentDisplay(props) {
  const [numArr, setNumArr] = React.useState(['0', '0', '0', '0']);
  const millivolts = props.millivolts - 4;
  const temperatura = convertMillivoltsToCelsius(millivolts);
  const howManyBits = 0;

  React.useEffect(() => {
    // console.log(temperatura)
    let dotIndex;
    if (temperatura?.includes('.')) {
      dotIndex = temperatura.indexOf('.');
    }
    let result = temperatura.substring(0, dotIndex).split('');
    if (howManyBits === 0) {
      if (result.length < 4) {
        while (result.length < 4) {
          result.unshift('');
        }
        setNumArr(result);
      }
    } else {
      result = replaceWithDot(result);
      // Выводит числа полсе точки
      const bits = getFractionalPart(temperatura).split('');
      let ttt = [];
      ttt = formatData(result, bits, howManyBits);
      setNumArr(ttt)
      console.log(ttt);

      // result =
      // console.log(result);
      // result = ttt.join('').substring(0, ttt.length - (-1))
      // for (let i = 0; i < 4; i++) {
      //   result.push(ttt[i])
      // }
      // console.log(result)

      // if ( bits.length < howManyBits){
      //   for (let i=0; i < (howManyBits - bits.length); i++){
      //     bits.push('0');
      //   }
      // }
      // if (result.length + howManyBits < 4) {
      //   // const zeroCount = 4 - (result.length + howManyBits);
      //   // console.log(`\"${result}\" - \"${bits}\" - \"${howManyBits}\"`);
      //   result = addFloatAfterDot(result, bits, howManyBits);
      //   // console.log(result);
      //   if (result.length < 4) {
      //     result = addZeroCounts(result);
      //   }
      //   // for (let i = 0; i < howManyBits; i++) {
      //   //   result.push(bits[i]);
      //   // }
      //   // console.log('result after', result);
      //   setNumArr(result);
      // }
      // else if (result.length + howManyBits === 4) {
      //   const zeroCount = 4 - (result.length + howManyBits);
      //   for (let i = 0; i < zeroCount; i++) {
      //     result.push(bits[i]);
      //   }
      //   // result[-1] = `${result[-1]}.`;
      // }
    }
  }, [temperatura]);

  function formatData(arr, bits, howManyBits) {
    console.log(arr, bits, howManyBits);
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

  function convertMillivoltsToCelsius(mv) {
    const mVoltRange = [4, 20];
    const celsiusRange = [0, 600];
    const keff = celsiusRange[1] / (mVoltRange[1] - mVoltRange[0]);
    return String((keff * mv).toFixed(3));
  }

  function getFractionalPart(str) {
    const parts = str.split('.');
    return parts.length > 1 ? parts[1] : '';
  }

  function addFloatAfterDot(arr, bits, howManyBits) {
    let arrTemp = arr;
    for (let i = 0; i < howManyBits; i++) {
      arrTemp.push(bits[i]);
    }
    return arrTemp;
  }
  function replaceWithDot(mass) {
    let arr = mass;
    const temp = arr[arr.length - 1];
    arr[arr.length - 1] = `${temp}.`;
    return arr;
  }

  function addZeroCounts(mass) {
    let arr = mass;
    const zeroCount = 4 - arr.length;
    for (let i = 0; i < zeroCount; i++) {
      arr.unshift('');
    }
    return arr;
  }

  return (
    <div className="display">
      {numArr.map((num, i) => {
        return <SevenSegmentDigit key={i} value={num} />;
      })}
    </div>
  );
}

export default SevenSegmentDisplay;

// result = temperatura.substring(0, dotIndex).split('');
// const tmp = result[result.length - 1];
// result[result.length - 1] = `${tmp}.`;
