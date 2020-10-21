let canvas;
let ctx;
let character_x = 100;
let character_y = 250;
let isMovingRight = false;
let isMovingLeft = false;
let bg_elements = 0;
let lastJumpStarted = 0;
let currentCharacterImage = 'img/charakter_1.png';
let characterGraphicsRight = ['img/charakter_1.png', 'img/charakter_2.png', 'img/charakter_3.png', 'img/charakter_4.png',]
let characterGraphicsLeft = ['img/charakter_left_1.png', 'img/charakter_left_2.png', 'img/charakter_left_3.png', 'img/charakter_left_4.png',]
let characterGraphicIndex = 0;
let cloudOffset = 0;
let chickens 

//...............Game config
let JUMP_TIME = 500; // in ms
let GAME_SPEED = 7;


function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    createChickenList();
    checkForRunning();
    draw();
    calculateCloudOffset();
    listenForKeys();
    calculateChickenPosition();
}

function calculateChickenPosition(){
    setInterval( function(){
        for(let i = 0; i < chickens.length; i++){
            let chicken = chickens[i];
            chicken.position_x = chicken.position_x - chicken.speed;
        }
    }, 50);  
}

function createChickenList(){
    chickens = [
        createChicken(1, 200),
        createChicken(2, 400),
        createChicken(1, 700)
    ];
}

function calculateCloudOffset(){
    setInterval(function(){
        cloudOffset = cloudOffset + 0.25;
    }, 50)
}


function checkForRunning() {
    setInterval(function(){
        if (isMovingRight) { // Change graphic
            let index = characterGraphicIndex % characterGraphicsRight.length;
            currentCharacterImage = characterGraphicsRight[index]
            characterGraphicIndex = characterGraphicIndex +1;
        }

        if (isMovingLeft) { // Change graphic
            let index = characterGraphicIndex % characterGraphicsLeft.length;
            currentCharacterImage = characterGraphicsLeft[index]
            characterGraphicIndex = characterGraphicIndex +1;   
        }
    }, 100);
    
}

function draw(){
    drawBackground();
    updateCaracter();
    requestAnimationFrame(draw);
    drawChicken();
}

function drawChicken(){
    for(i = 0; i < chickens.length; i = i + 1){
        let chicken = chickens[i];
        addBackgroundObject(chicken.img, chicken.position_x, chicken.position_y, chicken.scale, 1);
    } 
}

function createChicken(type, position_x){
    return{
    "img": "img/chicken" + type + ".png",
    "position_x": position_x,
    "position_y": 325,
    "scale": 0.6,
    "speed": (Math.random() * 5)
    };
}

function drawBackground() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGround();

    //draw Clouds
    addBackgroundObject('img/cloud1.png', 100 - cloudOffset, 20, 0.8, 1);
    addBackgroundObject('img/cloud2.png', 500 - cloudOffset, 20, 0.6, 1);
    addBackgroundObject('img/cloud1.png', 800 - cloudOffset, 20, 1, 1);
    addBackgroundObject('img/cloud2.png', 1300 - cloudOffset, 20, 0.8, 1);   
}

function updateCaracter() {
    let base_image = new Image();
    base_image.src = currentCharacterImage;

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
        bg_elements = bg_elements -GAME_SPEED;
    }

    if(isMovingLeft){
        bg_elements = bg_elements +GAME_SPEED;
    }
    addBackgroundObject('img/bg_elem_1.png', 0, 195, 0.6, 0.4);
    addBackgroundObject('img/bg_elem_2.png', 450, 120, 0.6, 0.5);
    addBackgroundObject('img/bg_elem_1.png', 700, 255, 0.4, 0.7);
    addBackgroundObject('img/bg_elem_2.png', 1100, 260, 0.3, 0.5);

    addBackgroundObject('img/bg_elem_1.png', 1300, 195, 0.6, 0.4);
    addBackgroundObject('img/bg_elem_2.png', 1450, 120, 0.6, 0.5);
    addBackgroundObject('img/bg_elem_1.png', 1700, 255, 0.4, 0.7);
    addBackgroundObject('img/bg_elem_2.png', 2000, 260, 0.3, 0.5);


    //draw Ground
    ctx.fillStyle = "#FFE699";
    ctx.fillRect(0, 375, canvas.width, canvas.height - 375);

    for(let i = 0; i < 10; i = i+1){
        addBackgroundObject('img/sand.png',i * canvas.width, 375, 0.360, 0.3)  
    }
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
            //character_x = character_x + 5;
        }
        if (k == 'ArrowLeft'){
            isMovingLeft = true;
            //character_x = character_x - 5;
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
            //character_x = character_x + 5;
        }
        if (k == 'ArrowLeft'){
            isMovingLeft = false;
            //character_x = character_x - 5;
        }
        //if (e.code == "Space"){
        //    isJumping = false;
        //}
    });
}

//last watched Video 19 - Gegner Bewegen