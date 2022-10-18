//? Getting the canvas
const canvas = document.getElementById('gameCanvas');

//? Getting the canvas context
const c = canvas.getContext('2d');

//? Creating a mouse variable
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

//? Array for keys currently pressed
var keysPressed = {
    
}

//? Fps variables
let filterStrength = 20;
let frameTime = 0, lastLoop = new Date, thisLoop;

//? So we can update the mouses location
addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

//? Fps counter
var fpsOut = document.getElementById('fps');
setInterval(function(){
  fpsOut.innerHTML = (1000/frameTime).toFixed(1) + " fps";
}, 50);

const rectangles = [];

//? creating 2 rectangles in specific positions.
rectangles.push(new Rectangle(mouse.x, mouse.y, 100, 100, "#E86262", true, true));
rectangles.push(new Rectangle(500, 500, 100, 100, "#92ABEA", true, true))


document.addEventListener("keydown", async (event) => {
    keysPressed[event.key] = true;
    console.log(keysPressed);
})

document.addEventListener("keyup", async (event) => {
    delete keysPressed[event.key];
})

//? Main animation loop
function animate() {
    //? For fps
    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;

    //? Changing the size of the canvas
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    requestAnimationFrame(animate);
    //? Changing the canvas color
    c.fillStyle = '#1A1A23';
    c.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < rectangles.length; i++) {
        rectangles[i].colliding = false;
    }

    for(let i = 0; i < rectangles.length; i++) {
        for(let j = 0; j < rectangles.length; j++) {
            if(j != i) {
                sqrColCheck(rectangles[i], rectangles[j]);
            }
        }
    }
    
    for(let i = 0; i < rectangles.length; i++) {
        rectangles[i].onGround();
    }
    
    if(keysPressed['a'] || keysPressed['ArrowLeft']) {
        if(!rectangles[0].leftColliding) {
            rectangles[0].xVelocity -= .5;
        }
    }

    if(keysPressed['d'] || keysPressed['ArrowRight']) {
        if(!rectangles[0].rightColliding) {
            rectangles[0].xVelocity += .5;
        }
    }

    if(keysPressed['w'] || keysPressed['ArrowUp']) {
        if(rectangles[0].bottomColliding) {
            rectangles[0].yVelocity -= 20;
        }
    }

    if(keysPressed['n']) {
        if(rectangles.length > 10) {
            rectangles.pop();
        }
        rectangles.push(new Rectangle(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height), 300, 100, "green", true, false))
    }

    for(let i = 0; i < rectangles.length; i++) {
        if(!rectangles[i].colliding) {
            rectangles[i].color = rectangles[i].originalColor;
        } 
        rectangles[i].draw(c);
    }
}
animate();