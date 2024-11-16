import React from 'react';
import styles from './Irt.module.scss';
import SevenSegmentDisplay from '../DigitSevenSegment/SevenSegmentDisplay';
import { MillivoltsContext } from '../../App';
function Irt(props) {
  const [pressedKeys, setPressedKeys] = React.useState({});
  const [howManyBits, setHowManyBits] = React.useState(3);
  const millivolts = React.useContext(MillivoltsContext);
  const isConnected = props.isConnected;
  const handleKeyDown = (event) => {
    setPressedKeys((prevKeys) => ({ ...prevKeys, [event.key.toLowerCase()]: true }));
  };
  const handleKeyUp = (event) => {
    setPressedKeys((prevKeys) => ({ ...prevKeys, [event.key.toLowerCase()]: false }));
  };
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  React.useEffect(() => {
    if (pressedKeys['s'] || pressedKeys['ы']) {
      // console.log('Нажата клавиша S')
      // Здесь можно вызвать функцию, которая должна выполниться при нажатии A
    } else if (pressedKeys['a'] || pressedKeys['ф']) {
      setHowManyBits(howManyBits > 0 ? howManyBits - 1 : 0);
      // console.log('Нажата клавиша A');
      // Здесь можно вызвать функцию, которая должна выполниться при нажатии A
    } else if (pressedKeys['d'] || pressedKeys['в']) {
      // setHowManyBits((howManyBits < 3) ? (howManyBits + 1) : 3)
      setHowManyBits(howManyBits < 3 ? howManyBits + 1 : 3);
      // setHowManyBits(howManyBits + 1)
      // console.log('Нажата клавиша D');
      // Здесь можно вызвать функцию, которая должна выполниться при нажатии D
    } else if (pressedKeys['Enter']) {
      // console.log('Нажата клавиша Enter');
      // Здесь можно вызвать функцию, которая должна выполниться при нажатии Enter
    }
  }, [pressedKeys]);
  // const handleClick = (event) => {
  //   const id = event.currentTarget.id;
  // };
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            K1 <span className={styles.lamp_active}></span>
          </li>
          <li className={styles.list_item}>
            K2 <span className={styles.lamp}></span>
          </li>
          <li className={styles.list_item}>
            K3 <span className={styles.lamp}></span>
          </li>
        </ul>
        <SevenSegmentDisplay
          millivolts={isConnected ? millivolts : 4}
          howManyBits={howManyBits}
          size="big"
        />
      </div>
      <div className={styles.bottom}>
        <ul className={styles.wrapper}>
        <SevenSegmentDisplay
          millivolts={isConnected ? millivolts : 4}
          howManyBits={howManyBits}
          size="small"
        />
          <ul className={styles.button_list}>
            <li>
              <button
                id="left-btn"
                className={`${styles.button} ${
                  pressedKeys['a'] || pressedKeys['ф'] || pressedKeys['s'] || pressedKeys['ы']
                    ? styles.active
                    : ''
                }`}>
                <svg
                  width="40"
                  height="36"
                  viewBox="0 0 40 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 18L39.75 0.679489V35.3205L0 18Z" fill="#4755CF" />
                </svg>
              </button>
            </li>
            <li>
              <button
                id="right-btn"
                className={`${styles.button} ${
                  pressedKeys['d'] || pressedKeys['в'] || pressedKeys['s'] || pressedKeys['ы']
                    ? styles.active
                    : ''
                }`}>
                <svg
                  width="40"
                  height="36"
                  viewBox="0 0 40 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 18L0.25 35.3205V0.679491L40 18Z" fill="#4755CF" />
                </svg>
              </button>
            </li>
            <li>
              <button
                id="enter-btn"
                className={`${styles.button} ${pressedKeys['enter'] ? styles.active : ''}`}>
                <svg
                  width="48"
                  height="45"
                  viewBox="0 0 48 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect x="38" width="10" height="30" fill="#4755CF" />
                  <rect x="13" y="25" width="35" height="10" fill="#4755CF" />
                  <path d="M14 14L0 30.5L14 44.5V14Z" fill="#4755CF" />
                </svg>
              </button>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
}
export default Irt;
