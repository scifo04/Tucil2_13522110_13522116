import { Mafs, Coordinates, useMovablePoint, Point, Line } from "mafs"
import "./../../node_modules/mafs/core.css"
import "./../../node_modules/mafs/font.css"
import React, { useState,useEffect } from 'react';

function Mefs({uploadedPoints,points,controlPoints}) {
    const [origin,setOrigin] = useState([0,0]);

    const phase = useMovablePoint([0, 0], {
        constrain: "horizontal",
    });

    const init = []
    for (let i = 0; i < uploadedPoints.length-1; i++) {
        init.push(uploadedPoints[i])
    }

    const tail = []
    for (let i = 1; i < uploadedPoints.length; i++) {
        tail.push(uploadedPoints[i])
    }

    const control_init = controlPoints.slice(0,controlPoints.length-1)
    const control_tail = controlPoints.slice(1,controlPoints.length)

    useEffect(() => {
        const targetPoint = uploadedPoints[Math.ceil((uploadedPoints.length)/2)];
        const newOrigin = targetPoint ? [targetPoint.x, targetPoint.y] : [0, 0];
        setOrigin(newOrigin);
    }, [uploadedPoints]);

    return (
        <Mafs zoom={{min:0.1 ,max:4}} viewBox={{x:[origin[0],origin[1]], y:[origin[0],origin[1]], padding:3}}>
            <Coordinates.Cartesian subdivisions={4}/>
                {controlPoints.map((control) => (
                    <Point x={control.x} y={control.y} color="#ffff00"></Point>
                ))}
                {/* {uploadedPoints.map((upload) => (
                    <Point x={upload.x} y={upload.y} color="#00ff00"></Point>
                ))} */}
                {control_init.map((content,index) => (
                    <Line.Segment key={index} color="#ff0000" point1={[content.x,content.y]} point2={[control_tail[index].x,control_tail[index].y]}></Line.Segment>
                ))}
                {init.map((content,index) => (
                    <Line.Segment key={index} color="#0000ff" point1={[content.x,content.y]} point2={[tail[index].x,tail[index].y]}></Line.Segment>
                ))}
        </Mafs>
    )
}

export default Mefs;