//De globale variable placeres her.
var turban;
var score = 0;
var missed = 0;
var appelsiner = []
var header;
var spil = true;
var button;

function setup() {
    /*Fra index.html hives der fat i id'et 'status' hvor vi laver en tekst under mit canvas, 
    der skal fortæller status på spillet.
    */
    var status = document.getElementById('status');
    status.innerHTML = 'Igang';
    header = createElement('h1', 'Catch das Appelsinos');
    createCanvas(650, 600);
    //status.parentNode.appendChild gør at min status vises under canvas frem for over.
    status.parentNode.appendChild(status);
    x = rad;
    turban = new Kurv(670, 100, 70, 50, 10);
    /*I dette if-statement bestemmes der om et nyt spil skal startes eller om man vil joine
    et nyt vha. en pin-kode.
    Hvis man vil joine et allerede iganværende spil, connectes eline-socket, så skal man indtaste den
    pin-kode der kommer fra den anden skærm.
    Hvis man vil starte et nyt spil, så creates eline-socket, som gør at man kan spille multiplayer, 
    og at man er den der creater spillet*/
    if (confirm('Vil du joine et igangværende spil?')) {
        var pin = prompt('Pin');
        socket = ElineSocket.connect(pin);
    }else{
        socket = ElineSocket.create();
    }
    //Her kaldes funktionen handleMessage.
    socket.onMessage(handleMessage);
}

/*handleMessage gør at en ny appelsin skydes afsted på den modsatte skærm når der klikkes med musen, ved at 
kalde casen "shootNew", som er sat til at lave en appelsin.*/
function handleMessage(msg) {
    switch (msg.type) {
        case 'shootNew':
            appelsiner.push(new Appelsin(670, msg.y, 70, 50, 10));
            break;
        default:
            console.log('Unknown message', msg);
    }
}

function draw() {
    /*Her bestemmes hvornår spilet er i gang og hvornår spillet er i "Game Over" mode.
    Altså 'tegnes' parametrene for appelsin-klassen og turban-klassen, og hvis dette er sandt
    så er spillet igang. Hvis missed derimod er under 1 så sættes spil til false. */
    if (spil) {

        background(0);
        for (var i = 0; i < appelsiner.length; i++) {
            var appelsin = appelsiner[i]
            /*Var appelsinSlet, får appelsinen slette fra arrayet når den enten er blevet grebet eller
            er røget ud af skærmen.*/
            var appelsinSlet = appelsin.checkScore(turban);
            if (appelsinSlet){
                appelsiner.splice(i, 1);
                i--;
            }else{
            appelsin.move();
            appelsin.appelsin();
            }
        }

        display();

        turban.move();
    }else{
        //Her vises Game Over skærmen, hvor der derefter kommer en "restart game" knap der refrescher siden.
        document.getElementById('status').innerHTML = 'Game Over';
        button = createButton('Restart Game');
        button.position(300, 325);
        button.mousePressed(restartGame);
    }
    if (missed < 1){
        spil = false;
    }
}

//function restartGame sørger for at siden reloader når der trykkes på restart-knappen.
function restartGame() {
    location.reload();
}

function display() {
    //Her opsættes tekstfelterne for score og liv, ved at kalde på variablerne der er lavet globalt.
    fill(255)
    text("Score: " + score, width - 80, 30);
    text("Life: " + missed, width - 80, 50);
    text("Pin: " + socket.id, width - 80, 10);

    turban.tegn();

}
/*function mouseClicked er den funktion der bestemmer hvad der skal ske når man
trykker med musen. I dette tilfælde skydes der en ny appelsin afsted, da den har 
typen "shootNew" som er defineret længere oppe.*/ 
function mouseClicked() {
    socket.sendMessage({
        type: 'shootNew',
        y: mouseY,
    });
}
