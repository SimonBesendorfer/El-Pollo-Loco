let canvas;
let ctx;
character_x = 0;

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    setInterval(function (){
        drawBackground();
        updateCaracter();
    }, 50);
    listenForKeys();
}

function drawBackground() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGround();
}

function updateCaracter() {
    let base_image = new Image();
    base_image.src = 'img/charakter_1.png';
    base_image.onload = function () {
        ctx.drawImage(base_image, character_x, 250, base_image.width * 0.35, base_image.height * 0.35);
    };
}

function drawGround(){
    ctx.fillStyle = "#FFE699";
    ctx.fillRect(0, 375, canvas.width, canvas.height - 375);
}

function listenForKeys(){
    document.addEventListener("keydown", e => {
        const k = e.key;
        if (k =='ArrowRight'){
            character_x = character_x + 5;
        }
        if (k == 'ArrowLeft'){
            character_x = character_x - 5;
        }

        //if (handler.hasOOwnProperty(k)) {
        //   handler[k](k); 
        //}
    });
}

//last watched Video 05 - Grafik bewegen