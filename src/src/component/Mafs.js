import { Mafs, Coordinates, useMovablePoint, Point, Line } from "mafs"
import "./../../node_modules/mafs/core.css"
import "./../../node_modules/mafs/font.css"
import React from 'react';

function Mefs({uploadedPoints,points}) {
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

    const targetPoint = uploadedPoints[Math.ceil((uploadedPoints.length)/2)]
    const origin = targetPoint ? [targetPoint.x, targetPoint.y] : [0, 0]; // Using target point if available, otherwise defaulting to [0, 0]
    console.log(origin)

    return (
        <Mafs>
            <Coordinates.Cartesian subdivisions={4} origin={origin}/>
                {uploadedPoints.map((upload) => (
                    <Point x={upload.x} y={upload.y}></Point>
                ))}
                {init.map((content,index) => (
                    <Line.Segment key={index} point1={[content.x,content.y]} point2={[tail[index].x,tail[index].y]}></Line.Segment>
                ))}
        </Mafs>
    )
}

export default Mefs;