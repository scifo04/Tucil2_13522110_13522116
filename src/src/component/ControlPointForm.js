import React from 'react'
import NumericInput from 'react-numeric-input'
import "./../font/PROXON.TTF"

function ControlPointForm({controlValue,setControlValue,setNumberOfForms}) {
    const handleChange = (value) => {
        if (value !== null && value !== undefined) {
            setControlValue(value);
            setNumberOfForms((value+1));
        }
    }
    return (
        <div>
            <p style={{fontFamily:"PROXON",color:"#ff0000"}}>Control Point</p>
            <NumericInput min={1} value={controlValue} onChange={handleChange}></NumericInput>
        </div>
    );
}

export default ControlPointForm;