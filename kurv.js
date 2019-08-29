/*
Dette script definerer klassen Kurv.
*/
/*Sammenhængen mellem kurv.js og turbanen i sketch.js er at kurv.js er scriptet der definere kurven/turbanen og
alt den kan gøre, altså det er et script for et objekt der gør, at man nemt kan lave flere af samme objekt i programmet
ved at kalde objektet. I scetch.js kaldes turbanen så, sammen med grebet-funktionen. Sketch.js er altså "hovedscriptet" 
hvor selve siden laves.
*/

function Kurv(x, y, bredde, dybde, speed) {
    /* Den første del af funktionen er en "konstruktør".
    Den tager parametrene og konstruerer et nyt objekt 
    ud fra dem. Værdierne huskes som hørende til netop 
    dette objekt ved hjælp af nøgleordet this.
     */
    this.x = x;
    this.y = y;
    this.bred = bredde;
    this.dyb = dybde;
    this.speed = speed;
    this.col = [250,230,150];

//Her tegnes kurven, som appelsinerne gribes i. I dette tilfælde har vi sat et billede ind som kurv.
img= loadImage('Images/kurv.png');
    this.tegn = function() {
        fill(this.col);
        image(img, this.x-45, this.y-50, this.bred*2, this.dyb*2);
    }

    //Funktionen move definere hvad der skal bruges for at flytte rundt på kruven. Her bruges musen til at bevæge kurven.
    this.move = function(tast) {
        this.x = mouseX
        this.y = mouseY
    }

    //Funktionen grebet bestemmer hvordan kurven fanger appelsinerne.
    this.grebet = function(xa, ya, ra) {
        if ((ya < this.y+40 && ya > this.y-40) && xa > this.x+ra && xa < this.x+this.bred-ra) {
            return true;
        }
        else {
            return false;
        }
    }
}