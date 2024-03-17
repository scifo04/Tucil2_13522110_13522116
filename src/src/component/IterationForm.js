import React from 'react'
import NumericInput from 'react-numeric-input'
import "./../font/PROXON.TTF"

function IterationForm({iterationValue,setIterationValue}) {
    const handleChange = (value) => {
        if (value !== null && value !== undefined) {
            setIterationValue(value);
        }
    }
    return (
        <div>
            <p style={{fontFamily:"PROXON",color:"#ff0000"}}>Iteration</p>
            <NumericInput min={0} value={iterationValue} onChange={handleChange}></NumericInput>
        </div>
    );
}

export default IterationForm;