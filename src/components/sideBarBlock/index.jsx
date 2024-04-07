import React from 'react';
import './style.scss';

function SideBar() {
  return (
    <aside className="sidebar">
      <h2 className="title">Управление прибором</h2>
      <ul className="list">
        <li className="list-item">
          <span>"A" - </span>
          <button className="btn">
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
        <li className="list-item">
          <span>"S" - </span>
          <button className="btn">
            <svg
              width="40"
              height="36"
              viewBox="0 0 40 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M0 18L39.75 0.679489V35.3205L0 18Z" fill="#4755CF" />
            </svg>
          </button>
          <span>+</span>
          <button className="btn">
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
        <li className="list-item">
          <span>"D" - </span>
          <button className="btn">
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
        <li className="list-item">
          <span>"Enter" - </span>
          <button className="btn">
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
    </aside>
  );
}

export default SideBar;
