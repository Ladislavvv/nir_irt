import React from 'react';
import './style.scss';
import SevenSegmentDigit from './SevenSegmentDigit';

function SevenSegmentDisplay(props) {
    const [numArr, setNumArr] = React.useState(['0', '0', '0', '0']);
    const millivolts = props.millivolts - 4 || 0;
    const temperatura = convertMillivoltsToCelsius(millivolts);
    const howManyBits = props.howManyBits || 0;
    const displaySize = props.size;

    // React.useEffect(() => {
    //   let dotIndex;
    //   if (temperatura?.includes('.')) {
    //     dotIndex = temperatura.indexOf('.');
    //   }
    //   let result = temperatura.substring(0, dotIndex).split('');
    //   if (howManyBits === 0) {
    //     if (result.length < 4) {
    //       while (result.length < 4) {
    //         result.unshift('');
    //       }
    //       setNumArr(result);
    //     }
    //   } else {
    //     result = replaceWithDot(result);
    //     // Выводит числа полсе точки
    //     const bits = getFractionalPart(temperatura).split('');
    //     let ttt = [];
    //     // console.log(result, bits, howManyBits);
    //     ttt = formatData(result, bits, howManyBits);
    //     setNumArr(ttt)
    //     // console.log(ttt);
    //   }
    // }, [temperatura, howManyBits]);

    React.useEffect(() => {
        // const clampedTemperatura = Math.min(Number(temperatura), 600).toFixed(3);

        // let dotIndex;
        // if (clampedTemperatura.includes('.')) dotIndex = clampedTemperatura.indexOf('.');
        // let result = clampedTemperatura.substring(0, dotIndex).split('');
        // result = replaceWithDot(result);
        // const bits = getFractionalPart(clampedTemperatura).split('');
        // let ttt = [];
        // ttt = formatData(result, bits, howManyBits);
        // setNumArr(ttt);

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

    function convertMillivoltsToCelsius(mv) {
        const mVoltRange = [4, 20];
        const celsiusRange = [0, 600];

        let mvClamped = Math.min(Math.max(mv, mVoltRange[0]), mVoltRange[1]);

        const keff = celsiusRange[1] / (mVoltRange[1] - mVoltRange[0]);
        const output = String((keff * mv).toFixed(3));
        if (output < 0) return String((0).toFixed(3))
        if (output > 600) return String((600).toFixed(3))
        return output
        // return String((keff * (mvClamped - mVoltRange[0])).toFixed(3));
    }

    function getFractionalPart(str) {
        const parts = str.split('.');
        return parts.length > 1 ? parts[1] : '';
    }

    // function addFloatAfterDot(arr, bits, howManyBits) {
    //   let arrTemp = arr;
    //   for (let i = 0; i < howManyBits; i++) {
    //     arrTemp.push(bits[i]);
    //   }
    //   return arrTemp;
    // }
    function replaceWithDot(mass) {
        let arr = mass;
        const temp = arr[arr.length - 1];
        arr[arr.length - 1] = `${temp}.`;
        return arr;
    }

    // function addZeroCounts(mass) {
    //   let arr = mass;
    //   const zeroCount = 4 - arr.length;
    //   for (let i = 0; i < zeroCount; i++) {
    //     arr.unshift('');
    //   }
    //   return arr;
    // }

    return (
        <div className={`display${displaySize === 'small' ? '-small' : ''}`}>
            {numArr.map((num, i) => {
                return <SevenSegmentDigit key={i} value={num} displaySize={displaySize} />;
            })}
        </div>
    );
}

export default SevenSegmentDisplay;
