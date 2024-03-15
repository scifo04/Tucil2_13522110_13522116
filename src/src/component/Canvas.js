import React, { useEffect, useRef } from 'react';

function Canvas({ uploadedPoints, points }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let requestId;

        const draw = () => {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            // Translate to center of canvas and reverse y-axis
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.scale(1, -1);
        
            // Draw points
            for (let i = 0; i < uploadedPoints.length; i++) {
                const point = uploadedPoints[i];
                if (point?.x !== undefined && point?.y !== undefined) {
                    ctx.beginPath();
                    ctx.arc(point.x * 50, point.y * 50, 2, 0, Math.PI * 2);
                    ctx.fillStyle = "black";
                    ctx.fill();
                    ctx.closePath();
                }
        
                // Draw lines up to current point
                if (i > 0) {
                    ctx.beginPath();
                    ctx.moveTo(uploadedPoints[i - 1].x * 50, uploadedPoints[i - 1].y * 50);
                    ctx.lineTo(uploadedPoints[i].x * 50, uploadedPoints[i].y * 50);
                    ctx.strokeStyle = "white";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        
            // Reset transformation for other drawings
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        
            // Call requestAnimationFrame recursively
            requestId = requestAnimationFrame(draw);
        };
        

        // Start the animation loop
        draw();

        // Clean up by canceling the animation frame when component unmounts
        return () => {
            cancelAnimationFrame(requestId);
        };
    }, [uploadedPoints]);

    return (
        <div style={{ justifyContent: 'center', marginTop: "20px", marginBottom: "20px" }}>
            <canvas ref={canvasRef} width="500" height="500" style={{ border: '1px solid black' }}></canvas>
        </div>
    );
}

export default Canvas;
