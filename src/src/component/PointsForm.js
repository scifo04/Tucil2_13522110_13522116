import React, { useState } from 'react';
import './PointsFormStyle.css';

function PointsForm({ index, points, setPoints, addPoint, numberOfForms }) {
    const [pointValues, setPointValues] = useState('');

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPointValues(value);
        if (name === "x") {
            addPoint(value,(index*2));
        } else if (name === "y") {
            addPoint(value,(index*2)+1);
        }
    };

    return (
        <div>
            <div className="parent">
                <p>X,Y {index + 1}</p>
                <input type="text" className="inoneline" name="x" style={{ margin: '10px' }} onChange={handleInputChange} required />
                <input type="text" className="inoneline" name="y" style={{ margin: '10px' }} onChange={handleInputChange} required />
            </div>
        </div>
    );
}

export default PointsForm;
