const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");

carCanvas.width = 400;
const road = new Road(carCanvas.width / 2, carCanvas.width * .95, 3);
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

let carX = road.getLaneCenter(1);
let carY = 400;
let carWidth = 30;
let carHeight = 50;

let filterStrength = 20;
let frameTime = 0, lastLoop = new Date, thisLoop;

let cars = generateCars(100);
let bestCar = cars[0];
let bestCary = 0;
let carLocationY = [];
let carLocationX = [];

let reloaded = false;

let fpsOut = document.getElementById('fps');
setInterval(function(){
  fpsOut.innerHTML = (1000/frameTime).toFixed(1) + " fps";
},50);

if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain")
        )

        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, .2);
        }
    }
}

const traffic = [
    new Car(road.getLaneCenter(0), -100, 30, 50, false, false),
    new Car(road.getLaneCenter(1), -100, 30, 50, false, false),
    new Car(road.getLaneCenter(0), -100, 30, 50, false, false),
    new Car(road.getLaneCenter(1), -100, 30, 50, false, false),
    new Car(road.getLaneCenter(0), -100, 30, 50, false, false),
    new Car(road.getLaneCenter(1), -100, 30, 50, false, false)
]


function generateCars(N) {
    const cars = [];

    for (i = 0; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 50, 30, 50, false, true))
    }

    return cars;
}

// cars.push(new Car(road.getLaneCenter(1), 50, 30, 50, true, false))

let brokenCars = [];

animate();

function save() {
    const bestCar = cars.find(c => c.points == Math.max(...cars.map(c => c.points)));
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function reload() {
    reloaded = true;
    save();

    location.reload();
}

setTimeout(() => {
    if(reloaded == false) {
        reload();
    } else {
        return undefined;
    }
}, 120 * 1000)

function animate(time) {

    let thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    for (let i = 0; i < cars.length; i++) {
        for(let j = 0; j < road.laneCount; j++) {
            if(cars[i].x >= road.getLaneCenter(j) - 20 && cars[i].x <= road.getLaneCenter(j) + 20) {
                if(!cars[i].removePoints) {
                    cars[i].bonusPoints++;
                } else {
                    cars[i].bonusPoints += -10;   
                }
                if(j != cars[i].lane) {
                    cars[i].bonusPoints += 50;
                    cars[i].lane = j;
                    cars[i].laneTime = Date.now() + 20*1000
                }
            }
        }
        cars[i].update(road.borders, traffic);
    }

    const bestCar = cars.find(c => c.points == Math.max(...cars.map(c => c.points)));


    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * .7);


    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }
    carCtx.globalAlpha = .2;
    for (let i = 0; i < cars.length; i++) {
        if(cars[i] != bestCar && cars[i].damaged) {
            cars.splice(i, 1);
            continue
        }
        cars[i].draw(carCtx, "blue")
    }

    carCtx.globalAlpha = 1;

    bestCar.draw(carCtx, "blue", true);
    carCtx.restore();

    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);

    for (let i = 0; i < cars.length; i++) {
        brokenCars = [];
        if (cars[i].damaged == true) {
            brokenCars.push(cars[i]);
        }

        if (brokenCars.length == cars.length && reloaded == false) {
            reload();
        }
    }

    for(let i = 0; i < cars.length; i++) {
        if(cars[i].y - 400 > bestCar.y) cars[i].damaged = true;
        if(cars[i].y == cars[i].oldy && cars[i].oldx == cars[i].x) cars[i].damaged = true;
    }

    for (let i = 0; i < traffic.length; i++) {
        if(traffic[i].y > bestCar.y + 400) {
            traffic[i] = new Car(road.getLaneCenter(Math.round(Math.random() * 3)), bestCar.y - (Math.random() * 900 + 800), 30, 50, false, false)
        }
    }


    console.log(`Points : ${bestCar.points}
Base points : ${bestCar.basePoints}
Bonus points : ${bestCar.bonusPoints}
lane : ${bestCar.lane}
laneTime : ${bestCar.laneTime}
Time till reduce : ${bestCar.damaged ? "none" : bestCar.laneTime - Date.now() - 60*5}
Dead? : ${bestCar.damaged}`);
}