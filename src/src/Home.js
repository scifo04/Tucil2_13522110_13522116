import React,{useState} from 'react'
import ControlPointForm from './component/ControlPointForm.js'
import IterationForm from './component/IterationForm.js';
import PointsForm from './component/PointsForm.js';
import InsertForm from './component/InsertForm.js';
import './Homestyle.css'

function Home() {
    const [controlValue, setControlValue] = useState('');
    const [numberOfForms, setNumberOfForms] = useState(0);
    return (
        <div className="center">
            <h1>Bezier Curve Generator</h1>
            <p>Generate your curve here</p>
            <ControlPointForm controlValue={controlValue} setControlValue={setControlValue} setNumberOfForms={setNumberOfForms}/>
            <IterationForm/>
            {[...Array(numberOfForms)].map((_,index) => (
                <PointsForm key={index} index={index}/>
            ))}
            <InsertForm controlValue={controlValue}/>
        </div>
    );
}

export default Home;