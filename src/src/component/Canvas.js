import React, { useEffect } from 'react';

function Canvas({ uploadedPoints }) {
    useEffect(() => {
        // Get the canvas element
        var canvas = document.getElementById("bezier");
        var ctx = canvas.getContext("2d");

        // Draw function to draw points and lines
        function draw() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw points
            uploadedPoints?.forEach(function(point) {
                if (point?.x !== undefined && point?.y !== undefined) {
                    ctx.beginPath();
                    ctx.arc(point.x*50, point.y*50, 5, 0, Math.PI * 2);
                    ctx.fillStyle = "red";
                    ctx.fill();
                    ctx.closePath();
                }
            });

            // Draw lines
            if (uploadedPoints?.length > 1) {
                ctx.beginPath();
                ctx.moveTo(uploadedPoints[0]?.x*50, uploadedPoints[0]?.y*50);
                for (var i = 1; i < uploadedPoints.length; i++) {
                    if (uploadedPoints[i]?.x !== undefined && uploadedPoints[i]?.y !== undefined) {
                        ctx.lineTo(uploadedPoints[i].x*50, uploadedPoints[i].y*50);
                    }
                }
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 1;
                ctx.stroke(); // Stroke after all points are connected
                ctx.closePath(); // Close the path after drawing the line
            }
        }

        // Call the draw function
        draw();
    }, [uploadedPoints]); // Depend on uploadedPoints to redraw when it changes

    return (
        <div style={{ justifyContent: 'center',marginTop:"20px",marginBottom:"20px" }}>
            <canvas id="bezier" width="500" height="800" style={{ border: '1px solid black' }}></canvas>
        </div>
    );
}

export default Canvas;
