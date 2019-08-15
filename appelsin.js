/* Jeg har valgt at flytte alt der har med appelsinen at gøre hen i et script for sig selv, sådan at man kan påvirke
det enkelte objekt (appelsinen), uden at påvirke turbanen/kurven. Dette gør det nemmere at tilføje flere appelsiner 
eller påvirke appelsinens parametre. Jeg har derfor kun meget få funktioner tilbage i sketch.js som er nødvendige for 
at programmet virker.
*/

//Variabler

var grav = 0.1;
var col = [200, 100, 0];
var rad = 20;

var turban;

var score = 0;
var missed = 10;



function Appelsin() {
    var tid = 20;
    var x = 0;
    var y = random(250, 550);
    var xspeed = 4;
    var yspeed = -8;
    this.yspeed = yspeed;
    var rad = 20;
    var newspeed = yspeed;

    this.appelsin = function () {
        //Her skal vi sørge for at appelsinen bliver vist, hvis den skal vises
        if (tid > 0) {
            tid -= 1;
        }
        if (tid < 100) {
            fill(col);
            ellipse(x, y, rad * 2, rad * 2);
        }

        // Her vises turbanen - foreløbig blot en firkant

    }

    this.move = function () {
        //Her skal vi sørge for at appelsinen bevæger sig, hvis den er startet
        if (tid <= 0) {
            x += xspeed;
            y += yspeed;
            yspeed += grav;
        }
        if (x > width || y > height) {
            missed -= 1
            this.shootNew();
        }


    }

    this.shootNew = function () {
        //Her skal vi sørge for at en ny appelsin skydes afsted 
        x = rad;
        y = random(250, 550);
        yspeed = newspeed;
        xspeed = 6 * Math.random();
        tid = (int)(Math.random() * 400);
    }
    this.checkScore = function (turban) {
        // Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes en ny appelsin afsted
        if (yspeed > 0) {
            if (turban.grebet(x, y, rad)) {
                score += 1;
                this.shootNew();

            }

        }
        if (x > width || y > height) {
            missed -= 1
            appelsin.shootNew();
        }
    }
}