// Get canvas element and drawing context from DOM
const canvas = document.getElementById('drawspace');
const ctx = canvas.getContext('2d');

// Set reference point for game
var CENTER_X;
var CENTER_Y;

// Fullscreen the canvas
function fullscreenCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Set reference point for game
    CENTER_X = canvas.width/2;
    CENTER_Y = canvas.height/2;
}

// Player class
class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    update(){
        this.x = CENTER_X;
        this.y = CENTER_Y;
    }

    render(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Projectile class
class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    update(){
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    render(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Enemy class
class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    update(){
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    render(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

const player = new Player(CENTER_X, CENTER_Y, 30, "Blue");
const projectiles = [];
const enemies = [];

// Runs constantly
function spawnEnemies() {
    setInterval(() => {
        const r = (Math.random() * (30 - 8)) + 8;
        let x;
        let y;

        if(Math.random() < 0.5){
            x = Math.random() < 0.5 ? 0 - r : canvas.width + r;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - r : canvas.height + r;
        }

        const color = "green";

        const angle = Math.atan2(CENTER_Y - y, CENTER_X - x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };

        enemies.push(new Enemy(x, y, r, color, velocity));
    }, 500);
}

function init(){
    fullscreenCanvas();
    animate();
    spawnEnemies();
}

// Only runs when the tab is open
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Player
    player.update();
    player.render();

    // Projectiles
    projectiles.forEach((projectile) => {
        projectile.update();
        projectile.render();
    });

    // Enemies
    enemies.forEach((enemy) => {
        enemy.update();
        enemy.render();
    });

    window.requestAnimationFrame(animate);
}

// On click event
window.addEventListener("click", (event) => {
    const angle = Math.atan2(event.clientY - CENTER_Y, event.clientX - CENTER_X);
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
    
    projectiles.push(new Projectile(CENTER_X, CENTER_Y, 10, "red", velocity));
});

// On resize event
window.addEventListener("resize", (event) => {
    fullscreenCanvas();
});

init();