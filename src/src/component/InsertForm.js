import React from 'react'

function InsertForm({controlValue, iterationValue, points, addPoint, setUploadedPoints}) {
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
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            setUploadedPoints(responseData.gottenPoint)
            console.log('Response from Go server:', responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div>
            <button type='button' onClick={handleClick}>Insert</button>
        </div>
    );
}

export default InsertForm