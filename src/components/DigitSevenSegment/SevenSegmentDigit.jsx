import React from 'react';
import './style.scss';

function SevenSegmentDigit(props) {
  const [segments, setSegments] = React.useState([]);
  const numStr = props.value || '';
  const displaySize = props.displaySize;

  const segmentMap = new Map([
    ['0', ['a', 'b', 'c', 'd', 'e', 'f']],
    ['1', ['b', 'c']],
    ['2', ['a', 'b', 'g', 'e', 'd']],
    ['3', ['a', 'b', 'g', 'c', 'd']],
    ['4', ['f', 'g', 'b', 'c']],
    ['5', ['a', 'f', 'g', 'c', 'd']],
    ['6', ['a', 'f', 'g', 'c', 'd', 'e']],
    ['7', ['a', 'b', 'c']],
    ['8', ['a', 'b', 'c', 'd', 'e', 'f', 'g']],
    ['9', ['a', 'b', 'c', 'd', 'f', 'g']],
    ['-', ['g']],
    [' ', []],
    ['.', ['dot']],
    ['E', ['a', 'd', 'e', 'f', 'g']],
    ['r', ['e', 'g']],
    ['o', ['c', 'd', 'e', 'g']],
  ]);

  React.useEffect(() => {
    let newSegs = [];
    if (numStr.includes('.')) {
      newSegs = segmentMap.get(numStr[0]) || [];
      const dotSegs = segmentMap.get(numStr[1]) || [];
      newSegs = [...newSegs, ...dotSegs];
    } else {
      newSegs = segmentMap.get(numStr) || [];
    }
    setSegments(newSegs);
  }, [numStr]);

  return (
    <div className="digit">
      <div className={`parent${displaySize == 'small' ? '-small' : ''}`}>
        {['a', 'f', 'g', 'e', 'c', 'd', 'b', 'dot'].map((segment, i) => (
          <div
            key={segment}
            id={segment}
            className={`div${segment === 'dot' ? '8' : i+1}${displaySize === 'small' ? '-small' : ''} ${
              segments.includes(segment) ? 'active-red' : ''
            }`}>
            {/* {segment} */}
          </div>
        ))}
      </div>
    </div>
  );
}
export default SevenSegmentDigit;

//   aaa
  //  f    b
  //  f    b
  //   ggg
  //  e    c
  //  e    c
  //   ddd   dot