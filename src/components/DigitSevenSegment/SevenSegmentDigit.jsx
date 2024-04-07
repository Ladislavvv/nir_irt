import React from 'react';
import './style.scss';

function SevenSegmentDigit(props) {
  const [segments, setSegments] = React.useState([]);
  const numStr = props.value || '';

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
      {/* <div className="parent">
        <div id="a" className="div1  active-red">
          a
        </div>
        <div id="f" className="div2 active-green">
          f
        </div>
        <div id="g" className="div3">
          g
        </div>
        <div id="e" className="div4">
          e
        </div>
        <div id="c" className="div5">
          c
        </div>
        <div id="d" className="div6">
          d
        </div>
        <div id="b" className="div7">
          b
        </div>
        <div id="dot" className="div8">
          .
        </div>
      </div> */}

      <div className="parent">
        {['a', 'f', 'g', 'e', 'c', 'd', 'b', 'dot'].map((segment, i) => (
          <div
            key={segment}
            id={segment}
            className={`div${segment === 'dot' ? '8' : i+1} ${
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