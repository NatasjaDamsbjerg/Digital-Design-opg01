
var turban;
var score = 0;
var missed = 0;
var appelsiner = []
var header;
//var status;
var spil = true;
var button;

function setup() {
    /*Fra index.html hives der fat i id'et 'status' hvor jeg laver en tekst under mit canvas, 
    der skal fortæller status på spillet.
    */
    var status = document.getElementById('status');
    status.innerHTML = 'Igang';
    header = createElement('h1', 'Catch das Appelsinos');
    createCanvas(750, 600);
    status.parentNode.appendChild(status);
    x = rad;
    turban = new Kurv(670, 100, 70, 50, 10);
    appelsiner.push(new Appelsin(670, 100, 70, 50, 10));

    /*Her sættes intervallet for hvornår der skal skydes en ekstra appelsin afsted, sådan at 
    der er mere en 1 appelsin på skærmen af gangen.
    */
    setInterval(function () {
        appelsiner.push(new Appelsin(670, 100, 70, 50, 10));
    }, 30000)
}

function draw() {
    if (spil) {

        background(0);
        for (var i = 0; i < appelsiner.length; i++) {
            var appelsin = appelsiner[i]
            appelsin.checkScore(turban);
            appelsin.move();
            appelsin.appelsin();
        }

        display();

        turban.move();
    }else{
        //Her vises Game Over skærmen
        document.getElementById('status').innerHTML = 'Game Over';
        button = createButton('Restart Game');
        button.position(300, 375);
        button.mousePressed(restartGame);
    }
    if (missed < 1){
        spil = false;
    }
}

function restartGame() {
    location.reload();
}

function display() {
    //Her opsættes tekstfelterne for score og liv, ved at kalde på variablerne der er lavet globalt.
    fill(255)
    text("Score: " + score, width - 80, 30);
    text("Life: " + missed, width - 80, 50);

    turban.tegn();

}



function keyPressed() {

}

function mousePressed() {

}
