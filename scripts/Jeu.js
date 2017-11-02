/*globals document, setTimeout, Zone */

var Jeu = {};

// Dimension de la grille
Jeu.li = 7;
Jeu.co = 11;

//================== Services ==================
//================== Jeu.effacer ==================
Jeu.effacer = function (pere) { // PUBLIC
	while (pere.firstChild) {
		pere.removeChild(pere.firstChild);
	}
};

//================== Jeu.unElementDe ==================
Jeu.unElementDe = function (pere, tag, args) {
	// Crée un élément dans le pere et fixe certains attributs
	var element = document.createElement(tag);
	if (args.html) {
		element.innerHTML = args.html;
	}
	if (args.id) { 
		element.id = args.id;
	}
	if (args.classe) {
		element.className = args.classe;
	}
	if (args.image) {
		element.setAttribute("src", args.image);
		element.setAttribute("align", "middle");
	}
	if (args.onmouseover) {
		element.setAttribute("onmouseover", args.onmouseover);
	}
	if (args.onmouseout) {
		element.setAttribute("onmouseout", args.onmouseout);
	}
	if (args.onclick) {
		element.setAttribute("onclick", args.onclick);
	}
	if (args.href) {
		element.setAttribute("href", args.href);
	}
	pere.appendChild(element);
	return element;
};

//============= Jeu.entierZeroInf =============
Jeu.entierZeroInf = function (n) {
	return  Math.floor(n * Math.random());
};

//================== Jeu.listeDansLeDesordre ==================
Jeu.listeDansLeDesordre = function (original) {
	var k, x;
	var nombreDitems = original.length;
	var reponseDansLeDesordre = [];
	for (k = 0; k < nombreDitems; k += 1) {
		reponseDansLeDesordre[k] = null;
	}
	for (k = 0; k < nombreDitems; k += 1) {
		x = Math.floor(nombreDitems * Math.random());
		while (reponseDansLeDesordre[x] !== null) {
			x = Math.floor(nombreDitems * Math.random());
		}
		reponseDansLeDesordre[x] = original[k];
	}
	return reponseDansLeDesordre;
};

//================== Jeu.fondDeCouleur ==================
Jeu.fondDeCouleur = function (c) {
	Jeu.dom_body.className = c;
};

//================== Jeu.debutDePartie ==================
Jeu.debutDePartie = function () {
	Jeu.fondDeCouleur(null);
	Jeu.zone.raz();
};

//================== Jeu.finDePartie ==================
Jeu.finDePartie = function () {
	document.getElementById("aCacher").innerHTML = "";
	document.getElementById("console").innerHTML = "BRAVO ! Tu as trouvé la sortie";
	document.getElementById("console2").innerHTML = "<button id=\"replay\" type=\"submit\" onclick=\'window.location.reload(false)\'>REJOUER</button>";
};

//================== Jeu.avancerVersSortie ==================
Jeu.avancerVersSortie = function () {
	Jeu.zone.allerVersSortie();
	if (Jeu.zone.sortieAtteinte()) {
		Jeu.finDePartie();
	} else {
		setTimeout(Jeu.avancerVersSortie, 100);
	}
};

//================== COontrôle Interface ==================
//================== Jeu.clicAide ==================
Jeu.clicAide = function () {
	if (Jeu.dom_aide.className) {
		Jeu.dom_btnAide.innerHTML = "Cacher le mode d'emploi";
		Jeu.dom_aide.className = null;
	} else {
		Jeu.dom_btnAide.innerHTML = "Mode d'emploi";
		Jeu.dom_aide.className = "invisible";
	}
};

//================== Jeu.clicControle ==================
Jeu.clicControle = function () {
	Jeu.debutDePartie();
};

//================== Jeu.clicSolution ==================
Jeu.clicSolution = function () {
	setTimeout(Jeu.avancerVersSortie, 100);
};

//================== Jeu.clicAvancer ==================
Jeu.clicAvancer = function () {
	console.log("clic avancer");
	if (!Jeu.zone.onAvance()) {

	}
	if (Jeu.zone.sortieAtteinte()) {
		Jeu.finDePartie();
	}
};	

//================== Jeu.clicHaut ==================
Jeu.clicHaut = function () {
	console.log("clic haut");
	Jeu.zone.onTourne1();
	
};

//================== Jeu.clicBas ==================
Jeu.clicBas = function () {
	console.log("clic bas");
	Jeu.zone.onTourne2();
};

//================== Jeu.clicGauche ==================
Jeu.clicGauche = function () {
	console.log("clic gauche");
	Jeu.zone.onTourne3();
	
};

//================== Jeu.clicDroite ==================
Jeu.clicDroite = function () {
	console.log("clic droite");
	Jeu.zone.onTourne4();
};

//================== Initialisation du Jeu ==================
//================== Jeu.initJeu ==================
Jeu.initJeu = function () {
	// ici définition du jeu et initialisation 
	Jeu.zone = new Zone(Jeu.li, Jeu.co);
	Jeu.zone.installerDans(Jeu.dom_jeu);
};

//================== Jeu.init ==================
Jeu.init = function () {
	// le corps du document
	Jeu.dom_body = document.getElementsByTagName('body')[0];
	// zone d'affichage de l'aide (bouton aide au départ)
	Jeu.dom_btnAide = document.getElementById("btnAide");
	// zone d'affichage des informations (* au départ)
	Jeu.dom_aide = document.getElementById("aide");
	// zone de définition du jeu (vide au départ)
	Jeu.dom_jeu = document.getElementById("jeu");
	Jeu.initJeu();
	Jeu.debutDePartie();
};
