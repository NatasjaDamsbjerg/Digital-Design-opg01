/* Jeg har valgt at flytte alt der har med appelsinen at gøre hen i et script for sig selv, sådan at man kan påvirke
det enkelte objekt (appelsinen), uden at påvirke turbanen/kurven. Dette gør det nemmere at tilføje flere appelsiner 
eller påvirke appelsinens parametre. Jeg har derfor kun meget få funktioner tilbage i sketch.js som er nødvendige for 
at programmet virker.
*/

var rad = 20;
var xspeed = 4;
var yspeed = -10;
var newspeed;
var grav = 0.1;
//grav bestemmer hvor "hårdt" den falder, altså hvor meget gravity der er i programmet.
var col = [200,100,0];
// Øvrige
var tid = 100;
//tid er hvor hurtigt der kommer en ny appelsin
var score = 0;
var missed = 0;

function appelsiner(){

this.tegn2 = function(){
    
    //Her skal vi sørge for at appelsinen bliver vist, hvis den skal vises
    if(tid > 0) {
        tid -= 1;
    }
    if (tid < 100) {
        fill(col);
        ellipse(x, y, rad*2, rad*2);
    }
}

this.move = function() {
    //Her skal vi sørge for at appelsinen bevæger sig, hvis den er startet
    if (tid <= 0) {
        x += xspeed;
        y += yspeed;
        yspeed += grav;
    }
    if (x > width || y > height) {
        missed += 1;
        this.shootNew();
    }
}

this.shootNew = function() {
    //Her skal vi sørge for at en ny appelsin skydes afsted 
    x = rad;
    y = random(275,550);
    yspeed = newspeed;
    xspeed = 6*Math.random();
    tid = (int) (Math.random() * 400);
    }

}