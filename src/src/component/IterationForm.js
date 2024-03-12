import React,{useState} from 'react'

function IterationForm() {
    const [iterationValue, setIterationValue] = useState('');
    return (
        <div>
            <p>Iteration</p>
            <input type={Number} value={iterationValue} onChange={(e)=>setIterationValue(e.target.value)}></input>
        </div>
    );
}

export default IterationForm;