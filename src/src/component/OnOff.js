import React, { useState } from 'react';
import './OnOff.css';

function OnOff({isOn,setIsOn}) {

  const handleClick = () => {
    setIsOn(prevState => !prevState);
  };

  return (
    <div style={{marginLeft:'70px'}}>
        <div style={{display:'inline-block',verticalAlign:'middle',marginRight:'10px'}}>Bruteforce</div>
        <div className={`switch ${isOn ? 'on' : 'off'}`} onClick={handleClick} style={{verticalAlign:'middle'}}>
            <div className="slider"></div>
        </div>
        <div style={{display:'inline-block',verticalAlign:'middle',marginLeft:'10px'}}>Divide And Conquer</div>
    </div>
  );
}

export default OnOff;