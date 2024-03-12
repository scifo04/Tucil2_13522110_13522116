import React,{useState} from 'react'
import './PointsFormStyle.css'

function PointsForm({index}) {
    const [pointValue1, setPointValue1] = useState('');
    const [pointValue2, setPointValue2] = useState('');
    const [pointValue3, setPointValue3] = useState('');
    const [pointValue4, setPointValue4] = useState('');
    const [pointValue5, setPointValue5] = useState('');
    const [pointValue6, setPointValue6] = useState('');
    return (
        <div>
            <div className="parent">
                <p>X,Y {index+1}</p>
                <input type={Number} className="inoneline" style={{margin:"10px"}} value={pointValue1} onChange={(e)=>setPointValue1(e.target.value)} required></input>
                <input type={Number} className="inoneline" style={{margin:"10px"}} value={pointValue2} onChange={(e)=>setPointValue2(e.target.value)} required></input>
            </div>
        </div>
    );
}

export default PointsForm;