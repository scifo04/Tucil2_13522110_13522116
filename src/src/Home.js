import React, { useState } from 'react';
import ControlPointForm from './component/ControlPointForm.js';
import IterationForm from './component/IterationForm.js';
import PointsForm from './component/PointsForm.js';
import InsertForm from './component/InsertForm.js';
import './Homestyle.css';

function Home() {
    const [controlValue, setControlValue] = useState('');
    const [iterationValue, setIterationValue] = useState('');
    const [numberOfForms, setNumberOfForms] = useState(0);
    const [points, setPoints] = useState([]);

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
        <div className="center">
            <h1>Bezier Curve Generator</h1>
            <p>Generate your curve here</p>
            <ControlPointForm controlValue={controlValue} setControlValue={setControlValue} setNumberOfForms={setNumberOfForms} />
            <IterationForm iterationValue={iterationValue} setIterationValue={setIterationValue}/>
            {[...Array(numberOfForms)].map((_, index) => (
                <PointsForm key={index} index={index} points={points} setPoints={setPoints} addPoint={addPoint} />
            ))}
            <InsertForm controlValue={controlValue} iterationValue={iterationValue} points={points} addPoint={addPoint}/>
        </div>
    );
}

export default Home;
