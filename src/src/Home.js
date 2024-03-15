import React, { useState } from 'react';
import ControlPointForm from './component/ControlPointForm.js';
import IterationForm from './component/IterationForm.js';
import PointsForm from './component/PointsForm.js';
import InsertForm from './component/InsertForm.js';
import Canvas from './component/Canvas.js';
import BZER_PIC from './BZER.png';
import './Homestyle.css';

function Home() {
    const [controlValue, setControlValue] = useState('');
    const [iterationValue, setIterationValue] = useState('');
    const [numberOfForms, setNumberOfForms] = useState(0);
    const [points, setPoints] = useState([]);
    const [uploadedPoints, setUploadedPoints] = useState([]); 

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
                <h1 style={{display:'inline-block'}}>BezierCurveGenerator</h1>
            </div>
            <div className='center'>
                <div className="first-section">
                    <h1>Bezier Curve Generator</h1>
                    <p>Generate your curve here</p>
                    <ControlPointForm controlValue={controlValue} setControlValue={setControlValue} setNumberOfForms={setNumberOfForms} />
                    <IterationForm iterationValue={iterationValue} setIterationValue={setIterationValue}/>
                </div>
                <div className='second-section'>
                    <div className='insert-section'>
                        {[...Array(numberOfForms)].map((_, index) => (
                            <PointsForm key={index} index={index} points={points} setPoints={setPoints} addPoint={addPoint} />
                        ))}
                    </div>
                    <InsertForm controlValue={controlValue} iterationValue={iterationValue} points={points} addPoint={addPoint} setUploadedPoints={setUploadedPoints}/>
                    <Canvas uploadedPoints={uploadedPoints} points={points}/>
                </div>
            </div>
        </div>
    );
}

export default Home;
