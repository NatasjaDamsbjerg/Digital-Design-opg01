/* Jeg har valgt at flytte alt der har med appelsinen at gøre hen i et script for sig selv, sådan at man kan påvirke
det enkelte objekt (appelsinen), uden at påvirke turbanen/kurven. Dette gør det nemmere at tilføje flere appelsiner 
eller påvirke appelsinens parametre.
*/

//Globale variabler

var grav = 0.1;
var col = [200, 100, 0];
var rad = 20;

var turban;

var score = 0;
var missed = 10;



function Appelsin() {
    //Lokale variabler.
    var tid = 20;
    var x = 0;
    var y = random(250, 550);
    var xspeed = 4;
    var yspeed = -8;
    this.yspeed = yspeed;
    var rad = 20;
    var newspeed = yspeed;

    this.appelsin = function () {
        //Her skal vi sørge for at appelsinen bliver vist, hvis den skal vises.
        fill(col);
        ellipse(x, y, rad * 2, rad * 2);
        if (tid > 0) {
            tid -= 1;
        }
    }

    this.move = function () {
        //Her skal vi sørge for at appelsinen bevæger sig, hvis den er startet.
        if (tid <= 0) {
            x += xspeed;
            y += yspeed;
            yspeed += grav;
        }
    }

    this.shootNew = function () {
        //Her skal vi sørge for at en ny appelsin skydes afsted.
        x = rad;
        y = random(250, 550);
        yspeed = newspeed;
        xspeed = 6 * Math.random();
    }
    
    this.checkScore = function (turban) {
        // Her checkes om turbanen har fanget appelsinen. Hvis ja, så slettes appelsinen fra arrayet og scoren går 1 op.
        if (yspeed > 0) {
            if (turban.grebet(x, y, rad)) {
                score += 1;
                return true;
            }
        }
        //Her checkes om appelsinen røget ud af skærmen. Hvis ja, så slettes appelsinen fra arrayet og missed går 1 ned.
        if (x > width || y > height) {
            missed -= 1
            return true;
        }
        return false;
    }
}