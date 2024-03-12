import React from 'react'

function InsertForm({controlValue}) {
    const handleClick = () => {
        console.log('Control Value: ', controlValue);
    };
    return (
        <div>
            <button type='button' onClick={handleClick}>Insert</button>
        </div>
    );
}

export default InsertForm