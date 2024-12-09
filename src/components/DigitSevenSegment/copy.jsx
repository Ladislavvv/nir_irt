import React from 'react';
import './style.scss';
import SevenSegmentDigit from './SevenSegmentDigit';
import { TermoparaTypes } from '../../data/data';

function SevenSegmentDisplay(props) {
    const gradType = props.gradType;
    const [numArr, setNumArr] = React.useState(['0', '0', '0', '0']);
    const millivolts = props.millivolts || 0;
    const temperatura = convertMillivoltsToCelsius(millivolts);
    const howManyBits = props.howManyBits || 0;
    const displaySize = props.size;

    function convertMillivoltsToCelsius(mV) {
        // Find the corresponding thermocouple type
        const thermocouple = TermoparaTypes.find(type => type.name === gradType);
        if (!thermocouple || !mV) return 0;

        // Convert input mV (4-20) to actual thermocouple mV range
        const sensorRange = [4, 20];
        const maxTemp = thermocouple.data[thermocouple.data.length - 1].temp;
        const maxMv = thermocouple.data[thermocouple.data.length - 1].mV;

        // If mV is outside the sensor range, return boundary values
        if (mV <= sensorRange[0]) return 0;
        if (mV >= sensorRange[1]) return maxTemp;

        // Scale the input mV (4-20) to actual thermocouple mV range (0-maxMv)
        const actualMv = ((mV - sensorRange[0]) / (sensorRange[1] - sensorRange[0])) * maxMv;

        // Find two closest mV points in the data
        const data = thermocouple.data;
        let lowerPoint = data[0];
        let upperPoint = data[data.length - 1];

        for (let i = 0; i < data.length - 1; i++) {
            if (data[i].mV <= actualMv && data[i + 1].mV >= actualMv) {
                lowerPoint = data[i];
                upperPoint = data[i + 1];
                break;
            }
        }

        // Calculate temperature using linear interpolation
        const mVDiff = upperPoint.mV - lowerPoint.mV;
        const tempDiff = upperPoint.temp - lowerPoint.temp;
        const mVRatio = (actualMv - lowerPoint.mV) / mVDiff;

        return Math.round(lowerPoint.temp + (tempDiff * mVRatio));
    }

    React.useEffect(() => {
        const tempStr = String(temperatura);
        const integerPart = tempStr.split('.')[0];
        const digits = integerPart.split('').map(el => Number(el));

        let ttt = [...digits];
        while (ttt.length < 4) {
            ttt.unshift(0);
        }
        if (ttt.length > 4) {
            ttt = ttt.slice(-4);
        }
        console.log(ttt)
        setNumArr(ttt);
    }, [temperatura, howManyBits, millivolts]);

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
            {numArr.map((num, i) => (
                <SevenSegmentDigit key={i} value={num} displaySize={displaySize} />
            ))}
        </div>
    );
}

export default SevenSegmentDisplay;
