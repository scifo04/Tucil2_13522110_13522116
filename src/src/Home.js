import React, { useState } from 'react';
import ControlPointForm from './component/ControlPointForm.js';
import IterationForm from './component/IterationForm.js';
import PointsForm from './component/PointsForm.js';
import InsertForm from './component/InsertForm.js';
import Canvas from './component/Canvas.js';
import OnOff from './component/OnOff.js';
import Mefs from './component/Mafs.js';
import BZER_PIC from './BZER.png';
import "./font/TOURNER.TTF"
import "./font/PROXON.TTF"
import "./font/KRABBY PATTY.TTF"
import './Homestyle.css';

function Home() {
    const [controlValue, setControlValue] = useState('');
    const [iterationValue, setIterationValue] = useState('');
    const [numberOfForms, setNumberOfForms] = useState(0);
    const [points, setPoints] = useState([]);
    const [uploadedPoints, setUploadedPoints] = useState([]); 
    const [controlPoints, setControlPoints] = useState([]);
    const [timeTaken, setTimeTaken] = useState('');
    const [isOn, setIsOn] = useState(false);

    const addPoint = (newPoint,val) => {
        console.log('Added point: ',newPoint,val);
        if (newPoint !== "") {
            console.log(points.length,val)
            if (points.length <= val) {
                setPoints(prevPoints => {
                    const updatedPoints = [...prevPoints];
                    // If index exceeds current length, increase array size
                    if (val >= updatedPoints.length) {
                        const newSize = val + 1;
                        while (updatedPoints.length < newSize) {
                            updatedPoints.push(null); // Or any initial value you prefer
                        }
                    }
                    updatedPoints[val] = newPoint;
                    return updatedPoints;
                });
            }
        }
        setPoints(prevPoints => {
            const updatedPoints = prevPoints.map((point, i) => {
                if (i === val) {
                    return newPoint;
                }
                return point;
            });
            return updatedPoints;
        });
    };


    
    return (
        <div>
            <div className='topnav'>  
                <img src={BZER_PIC} alt='' width="70px" height="70px" style={{display:'inline-block'}}></img>
                <h1 style={{display:'inline-block',fontFamily:"KRABBY PATTY"}}>BezierCurveGenerator</h1>
            </div>
            <div className='center'>
                <div className="first-section">
                    <h1 style={{fontFamily:"TOURNER",color:"#c00000"}}>Bezier Curve Generator</h1>
                    <p style={{fontFamily:"PROXON",color:"#ee0000"}}>Generate your curve here</p>
                    <ControlPointForm controlValue={controlValue} setControlValue={setControlValue} setNumberOfForms={setNumberOfForms} />
                    <IterationForm iterationValue={iterationValue} setIterationValue={setIterationValue}/>
                </div>
                <div className='second-section'>
                    <div className='insert-section'>
                        {[...Array(numberOfForms)].map((_, index) => (
                            <PointsForm key={index} index={index} points={points} setPoints={setPoints} addPoint={addPoint} />
                        ))}
                    </div>
                    <OnOff isOn={isOn} setIsOn={setIsOn}/>
                    <div style={{marginBottom:"20px",marginTop:"20px"}}>{timeTaken}</div>
                    <InsertForm controlValue={controlValue} iterationValue={iterationValue} points={points} isOn={isOn} addPoint={addPoint} setUploadedPoints={setUploadedPoints} setTimeTaken={setTimeTaken} setControlPoints={setControlPoints}/>
                </div>
                <div className='third-section'>
                    <h1 style={{fontFamily:"TOURNER",color:"#ee0000"}}>Result</h1>
                    <Mefs uploadedPoints={uploadedPoints} points={points} controlPoints={controlPoints}/>
                </div>
            </div>
        </div>
    );
}

export default Home;
