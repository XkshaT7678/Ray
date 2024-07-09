const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

const angleSlider = document.getElementById('angleSlider');
const angleValue = document.getElementById('angleValue');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Refractive indices
const n1 = 1.0; // Medium 1 (e.g., air)
const n2 = 1.5; // Medium 2 (e.g., glass)

// Draw interface line
function drawInterface() {
    ctx.beginPath();
    ctx.moveTo(0, HEIGHT / 2);
    ctx.lineTo(WIDTH, HEIGHT / 2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Draw a light ray
function drawRay(startX, startY, angle, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    let x = startX;
    let y = startY;
    while (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
        x += Math.cos(angle);
        y -= Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

// Simulate refraction and reflection
function simulate(angleOfIncidence) {
    const angleOfIncidenceRad = angleOfIncidence * (Math.PI / 180);
    let angleOfRefractionRad;

    try {
        angleOfRefractionRad = Math.asin(n1 * Math.sin(angleOfIncidenceRad) / n2);
    } catch (e) {
        angleOfRefractionRad = Math.PI / 2;
    }

    const angleOfReflectionRad = angleOfIncidenceRad;

    // Draw incident ray
    drawRay(WIDTH / 2, HEIGHT / 2, Math.PI - angleOfIncidenceRad, 'red');

    // Draw refracted ray
    if (n1 !== n2) {
        drawRay(WIDTH / 2, HEIGHT / 2, Math.PI + angleOfRefractionRad, 'blue');
    }

    // Draw reflected ray
    drawRay(WIDTH / 2, HEIGHT / 2, Math.PI + angleOfReflectionRad, 'yellow');
}

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawInterface();
    const angle = parseInt(angleSlider.value, 10);
    angleValue.textContent = angle;
    simulate(angle); // Angle of incidence in degrees
}

// Event listener for slider input
angleSlider.addEventListener('input', draw);

// Initial draw
draw();
