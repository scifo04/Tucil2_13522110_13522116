import { Mafs, Coordinates, Point, Line } from "mafs"
import "./../../node_modules/mafs/core.css"
import "./../../node_modules/mafs/font.css"
import React, { useState, useEffect } from 'react';

function Mefs({ uploadedPoints, controlPoints }) {
    const [origin, setOrigin] = useState([0, 0, 0, 0]);
    const [animatedPoints, setAnimatedPoints] = useState([]);
    const [animatedLines, setAnimatedLines] = useState([]);

    const control_init = controlPoints.slice(0,controlPoints.length-1)
    const control_tail = controlPoints.slice(1,controlPoints.length)

    useEffect(() => {
        setAnimatedPoints([]);
        setAnimatedLines([]);
        if (uploadedPoints && uploadedPoints.length > 0) {
            const smallest_x = Math.min(...uploadedPoints.map(point => point.x));
            const smallest_y = Math.min(...uploadedPoints.map(point => point.y));
            const largest_x = Math.max(...uploadedPoints.map(point => point.x));
            const largest_y = Math.max(...uploadedPoints.map(point => point.y));
            setOrigin([smallest_x, largest_x, smallest_y, largest_y]);

            // Animation for plotting points
            let animationSpeed;
            if (uploadedPoints.length < 100) {
                animationSpeed = 5000 / uploadedPoints.length;
            } else {
                animationSpeed = 0.005; // Adjust as needed for animation speed
            }
            let pointIndex = 0;
            const pointAnimationInterval = setInterval(() => {
                if (pointIndex < uploadedPoints.length) {
                    const point = uploadedPoints[pointIndex];
                    setAnimatedPoints(prevPoints => [...prevPoints, point]);
                    pointIndex++;
                } else {
                    clearInterval(pointAnimationInterval);

                    // Animation for plotting lines
                    let lineIndex = 0;
                    const lineAnimationInterval = setInterval(() => {
                        if (lineIndex < uploadedPoints.length - 1) {
                            const line = [uploadedPoints[lineIndex], uploadedPoints[lineIndex + 1]];
                            setAnimatedLines(prevLines => [...prevLines, line]);
                            lineIndex++;
                        } else {
                            clearInterval(lineAnimationInterval);
                        }
                    }, animationSpeed);
                }
            }, animationSpeed);
        } else {
            setOrigin([0, 0, 0, 0]);
            setAnimatedPoints([]);
            setAnimatedLines([]);
        }
    }, [uploadedPoints]);

    return (
        <Mafs zoom={{ min: 0.1, max: 4 }} viewBox={{ x: [origin[0], origin[1]], y: [origin[2], origin[3]], padding: 3 }}>
            <Coordinates.Cartesian subdivisions={4} />
            {controlPoints.map((control, index) => (
                <Point key={index} x={control.x} y={control.y} color="#ffff00" />
            ))}
            {animatedPoints.map((point, index) => (
                <Point key={index} x={point.x} y={point.y} color="#00ff00" />
            ))}
            {control_init.map((content,index) => (
                <Line.Segment key={index} color="#ff0000" point1={[content.x,content.y]} point2={[control_tail[index].x,control_tail[index].y]}></Line.Segment>
            ))}
            {animatedLines.map((line, index) => (
                <Line.Segment key={index} color="#0000ff" point1={[line[0].x, line[0].y]} point2={[line[1].x, line[1].y]} />
            ))}
        </Mafs>
    )
}

export default Mefs;
