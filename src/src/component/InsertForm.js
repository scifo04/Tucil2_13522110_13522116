import React from 'react'
import "./../font/PROXON.TTF"

function InsertForm({controlValue, iterationValue, points, isOn, addPoint, setUploadedPoints, setTimeTaken, setControlPoints}) {
    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:8000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    controlValue: controlValue,
                    iterationValue: iterationValue,
                    points: points,
                    isOn: isOn,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            setUploadedPoints(responseData.gottenPoint)
            setTimeTaken(responseData.time_string)
            setControlPoints(responseData.controlPoint)
            console.log('Response from Go server:', responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div>
            <button type='button' onClick={handleClick} style={{fontFamily:"PROXON",fontSize:"20px",border:"0",boxShadow:"0px 0px 30px 15px #820000",borderRadius:"10px",backgroundColor:"#0f0f0f",color:"#820000",width:"100px",height:"30px"}}>Insert</button>
        </div>
    );
}

export default InsertForm