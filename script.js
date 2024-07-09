document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('rayDiagramCanvas');
    const context = canvas.getContext('2d');
    const objectDistanceSlider = document.getElementById('objectDistance');
    const objectDistanceValue = document.getElementById('objectDistanceValue');

    const drawDiagram = (objectDistance) => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Constants for mirror and focal length
        const mirrorCenterX = canvas.width / 2;
        const mirrorCenterY = canvas.height / 2;
        const focalLength = 100; // Adjust this value for your mirror

        // Draw mirror (concave)
        context.beginPath();
        context.arc(mirrorCenterX, mirrorCenterY, Math.abs(focalLength), 0, Math.PI, false);
        context.lineWidth = 2;
        context.strokeStyle = '#000';
        context.stroke();

        // Draw principal axis
        context.beginPath();
        context.moveTo(0, mirrorCenterY);
        context.lineTo(canvas.width, mirrorCenterY);
        context.strokeStyle = '#999';
        context.stroke();

        // Draw object
        const objectHeight = 20;
        const objectPositionX = objectDistance;
        const objectPositionY = mirrorCenterY - objectHeight / 2;
        context.fillStyle = '#f00';
        context.fillRect(objectPositionX, objectPositionY, 10, objectHeight);

        // Calculate image position and draw image
        const focalPointX = mirrorCenterX - focalLength;
        const imagePositionX = mirrorCenterX + (mirrorCenterX - objectPositionX);
        const imageHeight = objectHeight * Math.abs(focalLength) / Math.abs(focalLength - (objectPositionX - mirrorCenterX));
        const imagePositionY = mirrorCenterY - imageHeight / 2;
        context.fillStyle = '#00f';
        context.fillRect(imagePositionX, imagePositionY, 10, imageHeight);

        // Display object distance value
        objectDistanceValue.textContent = objectDistance;
    };

    objectDistanceSlider.addEventListener('input', function() {
        drawDiagram(parseInt(this.value));
    });

    drawDiagram(parseInt(objectDistanceSlider.value)); // Initial draw
});
