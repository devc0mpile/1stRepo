const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let ball = {
    x: 300,
    y: 50,
    radius: 10,
    dx: 2,
    dy: 0,
    gravity: 0.4,
    bounce: 1.0 
};

const triangle = [
    { x: 100, y: 100 },
    { x: 500, y: 100 },
    { x: 300, y: 250 },
];

function drawTriangle() {
    ctx.beginPath();
    ctx.moveTo(triangle[0].x, triangle[0].y);
    ctx.lineTo(triangle[1].x, triangle[1].y);
    ctx.lineTo(triangle[2].x, triangle[2].y);
    ctx.closePath();
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff5733";
    ctx.fill();
    ctx.closePath;
}

function updateBall() {
    ball.dy += ball.gravity;
    ball.y += ball.dy;
    ball.x += ball.dx;

    if (ball.y + ball.radius > 250) {
        ball.y = 250 - ball.radius;
        ball.dy = -ball.dy * ball.bounce;
    }

    const leftSlope = (250 - 100) / (300 - 100); 
    const leftY = leftSlope * (ball.x - 100) + 100;

    if (ball.x < 300 && ball.y > leftY - ball.radius) {
        ball.y = leftY - ball.radius;
        ball.dy = -ball.dy * ball.bounce;
        ball.dx = Math.abs(ball.dx); 
    }

    const rightSlope = (250 - 100) / (500 - 300); 
    const rightY = -rightSlope * (ball.x - 500) + 100;

    if (ball.x > 300 && ball.y > rightY - ball.radius) {
        ball.y = rightY - ball.radius;
        ball.dy = -ball.dy * ball.bounce;
        ball.dx = -Math.abs(ball.dx); 
    }

    if (Math.abs(ball.dy) < 0.1 && ball.y >= 248) {
        ball.dy = 0;
        ball.dx = 0;
    }
}

function draw() {
    ctx.clearRect(0, 0,  canvas.width, canvas.height);
    drawTriangle();
    drawBall();
    updateBall();
    requestAnimationFrame(draw);
}

draw();
