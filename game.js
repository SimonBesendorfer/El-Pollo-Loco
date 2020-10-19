let canvas;
let ctx;
let character_x = 0;
let character_y = 250;
let isMovingRight = false;
let isMovingLeft = false;
let bg_elements = 0;
let lastJumpStarted = 0;



//...............Game config
let JUMP_TIME = 300; // in ms


function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
 
    draw();

    listenForKeys();
}

function draw(){
    drawBackground();
    updateCaracter();
    requestAnimationFrame(draw);
}

function drawBackground() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGround();
}

function updateCaracter() {
    let base_image = new Image();
    base_image.src = 'img/charakter_1.png';

    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
    if (timePassedSinceJump < JUMP_TIME) {
        character_y = character_y - 10;
    } else {
        // Check falling
        if (character_y < 250) {
            character_y = character_y + 10;
        }
    }


    if (base_image.complete) {
        ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.35, base_image.height * 0.35);
    }
}

function drawGround(){
    


    if(isMovingRight){
        bg_elements = bg_elements -2;
    }

    if(isMovingLeft){
        bg_elements = bg_elements +2;
    }
    addBackgroundObject('img/bg_elem_1.png', 0, 195, 0.6, 0.4);
    addBackgroundObject('img/bg_elem_2.png', 450, 120, 0.6, 0.5);
    addBackgroundObject('img/bg_elem_1.png', 700, 255, 0.4, 0.7);
    addBackgroundObject('img/bg_elem_2.png', 1200, 260, 0.3), 0.5;


    //draw Ground
    ctx.fillStyle = "#FFE699";
    ctx.fillRect(0, 375, canvas.width, canvas.height - 375);

}

function addBackgroundObject(src, offsetX, offsetY, scale, opacity){
    if (opacity != undefined){
        ctx.globalAlpha = opacity;
    }
    let base_image2 = new Image();
    base_image2.src = src;
    if (base_image2.complete) {
        ctx.drawImage(base_image2, offsetX + bg_elements, offsetY, base_image2.width * scale, base_image2.height * scale);
    }
    ctx.globalAlpha = 1;
}

function listenForKeys(){
    document.addEventListener("keydown", e => {
        const k = e.key;


        if (k =='ArrowRight'){
            isMovingRight = true;
            character_x = character_x + 5;
        }
        if (k == 'ArrowLeft'){
            isMovingLeft = true;
            character_x = character_x - 5;
        }
        let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
        if (e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2){
            lastJumpStarted = new Date().getTime();
        }
    });

    document.addEventListener("keyup", e => {
        const k = e.key;
        if (k =='ArrowRight'){
            isMovingRight = false;
            character_x = character_x + 5;
        }
        if (k == 'ArrowLeft'){
            isMovingLeft = false;
            character_x = character_x - 5;
        }
        //if (e.code == "Space"){
        //    isJumping = false;
        //}
    });
}

//last watched Video 12 - Weitere Kakteen einfügen