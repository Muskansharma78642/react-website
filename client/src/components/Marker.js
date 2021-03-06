import React from 'react';

const Marker = ({ text, tooltip, $hover }) => {
    const handleClick = () => {
        console.log(`You clicked on `)
    }
  return (
    <div className={$hover ? 'circle hover': 'circle'} onClick={handleClick}>
      <span className='circleText' title={tooltip}>
        {text}
      </span>
    </div>
  );
}

export default Marker;
