/*global document, clearInterval, setInterval, timer, dictionnaire*/

// définition des couleurs de fond #Fx0
var fond = ["F", "D", "C", "9", "6", "3", "0"];
var letter;
var dom_body, dom_aide, dom_btnaide, dom_pendu, dom_console, dom_jeu, dom_controle, motSecret, motVisible, numeroPendu, cFini, lettresVues, nombreDErrreurs, numeroTest, nombreDeLettres, nombreDeMots, victoire;

//================== effacerElement ==================
function effacerElement(dom) {
	while (dom.firstChild) {
		dom.removeChild(dom.firstChild);
	}
}

function letterToInt(lett){
	var k = 0;
	if(lett == "A"){k = 1; return k;}
	else if(lett == "B"){k = 2; return k;}
	else if(lett == "C"){k = 3; return k;}
	else if(lett == "D"){k = 4; return k;}
	else if(lett == "E"){k = 5; return k;}
	else if(lett == "F"){k = 6; return k;}
	else if(lett == "G"){k = 7; return k;}
	else if(lett == "H"){k = 8; return k;}
	else if(lett == "I"){k = 9; return k;}
	else if(lett == "J"){k = 10; return k;}
	else if(lett == "K"){k = 11; return k;}
	else if(lett == "L"){k = 12; return k;}
	else if(lett == "M"){k = 13; return k;}
	else if(lett == "N"){k = 14; return k;}
	else if(lett == "O"){k = 15; return k;}
	else if(lett == "P"){k = 16; return k;}
	else if(lett == "Q"){k = 17; return k;}
	else if(lett == "R"){k = 18; return k;}
	else if(lett == "S"){k = 19; return k;}
	else if(lett == "T"){k = 20; return k;}
	else if(lett == "U"){k = 21; return k;}
	else if(lett == "V"){k = 22; return k;}
	else if(lett == "W"){k = 23; return k;}
	else if(lett == "X"){k = 24; return k;}
	else if(lett == "Y"){k = 25; return k;}
	else if(lett == "Z"){k = 26; return k;}
}

function IntToLetter(enti){
	var lett = "";
	if(enti == 1){lett = "A"; return lett;}
	else if(enti == 2){lett = "B"; return lett;}
	else if(enti == 3){lett = "C"; return lett;}
	else if(enti == 4){lett = "D"; return lett;}
	else if(enti == 5){lett = "E"; return lett;}
	else if(enti == 6){lett = "F"; return lett;}
	else if(enti == 7){lett = "G"; return lett;}
	else if(enti == 8){lett = "H"; return lett;}
	else if(enti == 9){lett = "I"; return lett;}
	else if(enti == 10){lett = "J"; return lett;}
	else if(enti == 11){lett = "K"; return lett;}
	else if(enti == 12){lett = "L"; return lett;}
	else if(enti == 13){lett = "M"; return lett;}
	else if(enti == 14){lett = "N"; return lett;}
	else if(enti == 15){lett = "O"; return lett;}
	else if(enti == 16){lett = "P"; return lett;}
	else if(enti == 17){lett = "Q"; return lett;}
	else if(enti == 18){lett = "R"; return lett;}
	else if(enti == 19){lett = "S"; return lett;}
	else if(enti == 20){lett = "T"; return lett;}
	else if(enti == 21){lett = "U"; return lett;}
	else if(enti == 22){lett = "V"; return lett;}
	else if(enti == 23){lett = "W"; return lett;}
	else if(enti == 24){lett = "X"; return lett;}
	else if(enti == 25){lett = "Y"; return lett;}
	else if(enti == 26){lett = "Z"; return lett;}
}

function setBorder(direction){
	letter = document.getElementsByClassName("selected")[0].id;
	var k = letterToInt(letter);
	if(direction == "ArrowRight"){
		if(k<26){
			document.getElementsByClassName("selected")[0].className = document.getElementsByClassName("selected")[0].className.replace("selected","");
			
				k = k+1;
				letter = IntToLetter(k);
				document.getElementById(letter).className += " selected";
		}
		else{}
	}
	else if(direction == "ArrowLeft"){
		if(k>1){
			document.getElementsByClassName("selected")[0].className = document.getElementsByClassName("selected")[0].className.replace("selected","");
			
				k = k-1;
				letter = IntToLetter(k);
				document.getElementById(letter).className += " selected";
		}
		else{}
	}
	else if(direction == "ArrowUp"){
		if(k>13){
			document.getElementsByClassName("selected")[0].className = document.getElementsByClassName("selected")[0].className.replace("selected","");
				k = k-13;
				letter = IntToLetter(k);
				document.getElementById(letter).className += " selected";
		}
		else{}
	}
	else if(direction == "ArrowDown"){
		if(k<14){
			document.getElementsByClassName("selected")[0].className = document.getElementsByClassName("selected")[0].className.replace("selected","");
				k = k+13;
				letter = IntToLetter(k);
				document.getElementById(letter).className += " selected";
		}
		else{}
	}
}

//============= afficherSurConsole =============
function afficherSurConsole(html, style) {
	if (style) {
		dom_console.className = style;
	} else {
		dom_console.className = null;
	}
	dom_console.innerHTML = html;
}

//================== actualiserPendu ==================
function actualiserPendu() {
	dom_pendu.setAttribute("src", "../images/p" + numeroPendu + ".gif");
}

//================== remiseAZero ==================
function remiseAZero() {
	var k, c, i;
	i=0;
	cFini = false;
	dom_controle.className = "invisible";
	lettresVues = 0;
	nombreDErrreurs = 0;
	numeroTest = 0;
	numeroPendu = 0;
	actualiserPendu();
	for(i; i<26; i++){
		document.getElementsByTagName("button").item(i).style.opacity = 1;
	}
	var btns = document.getElementsByTagName("button");
	for (k = 0; k < btns.length; k++) {
		btns[k].disabled = false;
	}
	// tirer un mot au hasard
	k = Math.floor(Math.random() * nombreDeMots);
	motSecret = dictionnaire[k];
	nombreDeLettres = motSecret.length;
	// préparer l'affichage
	motVisible = motSecret.charAt(0);
	for (k = 1; k < nombreDeLettres - 1; k++) {
		c = motSecret.charAt(k);
		motVisible += c === "-" || c === "'"  || c === " " ? c : ".";
	}
	motVisible += motSecret.charAt(nombreDeLettres - 1);
	dom_jeu.innerHTML = motVisible;
}

//================== CONTROLES ==================
//================== nouveauBouton ==================
function nouveauBouton(titre, onClick) {
	var element = document.createElement('button');
	element.setAttribute('type', 'button');
	element.setAttribute('onclick', onClick);
	element.innerHTML = titre;
	return element;
}

//================== crierVictoire ==================
function crierVictoire() {
	victoire--;
	if (victoire === 0) {
		clearInterval(timer);
		return;
	}
	
}

//================== afficherEtat ==================
function afficherEtat(lettre, ok) {
	var txt = "Essai n° " + numeroTest + " : &nbsp; &nbsp; &nbsp; La lettre " + lettre + " est " + (ok ? "présente" : "absente");
	if (lettresVues > 1) {
		txt += ", &nbsp; &nbsp;" + lettresVues + " lettres trouvées";
	} else if (lettresVues > 0) {
		txt += ", &nbsp; &nbsp; une lettre trouvée";
	}
	if (nombreDErrreurs === 5) {
		txt += ", &nbsp; &nbsp; <i>5<sup>ième</sup> et dernière erreur permise</i>";
	} else if (nombreDErrreurs > 1) {
		txt += ", &nbsp; &nbsp;" + nombreDErrreurs + " erreurs";
	} else if (nombreDErrreurs > 0) {
		txt += ", &nbsp; &nbsp; une erreur";
	}
	afficherSurConsole(txt);
}

//================== clicLettre ==================
function clicLettre(obj, lettre) {
	if (cFini) {
		return;
	}
	var k, cs, cv;
	var motNouveau = "";
	var ok = false;
	numeroTest++;
	document.getElementById(lettre).style.opacity = 0.5;
	for (k = 0; k < nombreDeLettres; k++) {
		cs = motSecret.charAt(k);
		cv = motVisible.charAt(k);
		if (cs === cv) {
			motNouveau += cs;
		} else if (cs === lettre) {
			motNouveau += cs;
			lettresVues++;
			ok = true;
		} else {
			motNouveau += cv;
		}
	}
	if (!ok) {
		nombreDErrreurs++;
		numeroPendu++;
		actualiserPendu();
	}
	motVisible = motNouveau;
	afficherEtat(lettre, ok);
	obj.disabled = true;
	dom_jeu.innerHTML = motVisible;
	if (motVisible === motSecret) {
		if (nombreDErrreurs === 0) {
			victoire = 50;
			timer = setInterval(crierVictoire, 25);
		}
		afficherSurConsole("Bravo ! &nbsp; Vous avez gagné" + (nombreDErrreurs === 0 ? " sans erreur." : ", mais vous avez fait " + nombreDErrreurs + " erreur" + (nombreDErrreurs > 1 ? "s." : ".")), "bravo");
		cFini = true;
		dom_controle.className = null;
		return;
	} else if (numeroPendu === 6) {
		afficherSurConsole("Perdu ! &nbsp; Vous avez trouvé " + lettresVues + " lettre" + (lettresVues > 1 ? "s" : "") + " sur les " + (nombreDeLettres - 2) + " de : &nbsp; " + motSecret, "perdu");
		cFini = true;
		dom_controle.className = null;
	}
}
//================== clicNouvellePartie ==================
function clicNouvellePartie() {
	afficherSurConsole("À vous de jouer . . .");
	remiseAZero();
	location.reload(); 
}

//================== init ==================
function init() {
	dom_body = document.getElementsByTagName("body")[0];
	// zone d'affichage de l'aide (bouton aide au départ)
	dom_aide = document.getElementById("aide");
	dom_btnaide = document.getElementById("btnaide");
	// zone d'affichage de l'image du Pendu
	dom_pendu = document.getElementById("pendu");
	// zone d'affichage des informations (* au départ)
	dom_console = document.getElementById("console");
	// zone d'affichage du bouton Nouveau Mot
	dom_controle = document.getElementById("controle");
	// zone de définition du jeu (vide au départ)
	dom_jeu = document.getElementById("jeu");
	remiseAZero();
}