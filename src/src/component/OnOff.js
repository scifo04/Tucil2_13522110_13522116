import React, { useState } from 'react';
import './OnOff.css';
import "./../font/PROXON.TTF"

function OnOff({isOn,setIsOn}) {

  const handleClick = () => {
    setIsOn(prevState => !prevState);
  };

  return (
    <div style={{marginLeft:'70px'}}>
        <div style={{display:'inline-block',verticalAlign:'middle',marginRight:'10px',fontFamily:"PROXON"}}>Bruteforce</div>
        <div className={`switch ${isOn ? 'on' : 'off'}`} onClick={handleClick} style={{verticalAlign:'middle'}}>
            <div className="slider"></div>
        </div>
        <div style={{display:'inline-block',verticalAlign:'middle',marginLeft:'10px',fontFamily:"PROXON"}}>Divide And Conquer</div>
    </div>
  );
}

export default OnOff;