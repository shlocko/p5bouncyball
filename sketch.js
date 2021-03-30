
let menu = true;
let gameOver = false;
let x, y, vy, pillars, timer, score;
x = 100;
y = 200;
vy = 0;
timer = 0;
score = 0;
pillars = [[250, randomInt(100, 250)], [400, randomInt(100, 250)]];

function setup() {
    createCanvas(400, 400);

}
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function update(){
    y+=vy;
    vy+=.3;
    if (millis() >= 2500+timer){
        pillars.push([400, randomInt(100, 250)]);
        console.log("New Pillar");
        timer = millis();
        score += 1;
    }
    for (let i = 0; i < pillars.length; i++){
        pillars[i][0] -= 1;

        if (y <= pillars[i][1] + 10|| y >= pillars[i][1]+93){
            if (pillars[i][0] <= 110 && pillars[i][0] >= 60){
                gameOver = true;
            }
        }

        if (pillars[i][0] < -50){
            pillars.splice(i, 1);
        }
    }

}
function drawPillars(){
    for (let pillar of pillars) {

        strokeWeight(1);
        stroke(51);
        rect(pillar[0], 0, 30, pillar[1]);
        rect(pillar[0], pillar[1] + 100, 30, 400);
    }
}

const drawMenu = () => {
    background(220);
    textSize(40);
    fill(0);
    text("Bouncy Ball", 75, 80);
    strokeWeight(0);
    if(mouseX > 100 && mouseX < 300 && mouseY > 200 && mouseY < 280){
        fill(200);
    } else {
        fill(250);
    }
    rect(100, 200, 200, 80);
    fill(0);
    text("Start", 150, 255);
}

const drawGame = () => {
    background(220);
    fill(256);
    ellipse(x,y,20);
    drawPillars();
    textSize(32);
    fill(0);
    text(score, 10, 30);
    update();
}

const drawGameOver = () => {
    textSize(40);
    fill(0);
    text("Game Over!", 75, 80);
    strokeWeight(0);
    if(mouseX > 100 && mouseX < 300 && mouseY > 200 && mouseY < 280){
        fill(200);
    } else {
        fill(250);
    }
    rect(100, 200, 200, 80);
    fill(0);
    text("Menu", 150, 255);
}

function draw() {
    if (menu){
        drawMenu();
    } else if (gameOver) {
        drawGameOver();
    } else {
        drawGame();
    }
}

function mousePressed() {
    if (menu) {
        if(mouseX > 100 && mouseX < 300 && mouseY > 200 && mouseY < 280){
            menu = false;
            timer = millis();
        }
    } else if (gameOver){
        if(mouseX > 100 && mouseX < 300 && mouseY > 200 && mouseY < 280){
            menu = true;
            gameOver = false;
            pillars = [[250, randomInt(100, 250)], [400, randomInt(100, 250)]];
            score = 0;
            y = 200;
            vy = 0;
            timer = millis();
        }

    } else {
        vy = -6;
    }
}
function keyPressed() {
    if(!menu && !gameOver) {
        if (keyCode === 32) {
            vy = -6;
        }
    }
}