import React from 'react';
import './style.scss';
import SevenSegmentDigit from './SevenSegmentDigit';

function SevenSegmentDisplay() {
  const temperatura = 244.353;
  const [numArr, setNumArr] = React.useState([]);
  const getValue = (num) => {
    let temp = num.split('');
    
  };

  return (
    <div className="display">
      <SevenSegmentDigit value={''} />
      <SevenSegmentDigit value={'5'} />
      <SevenSegmentDigit value={'6.'} />
      <SevenSegmentDigit value={'7'} />
    </div>
  );
}

export default SevenSegmentDisplay;
