/*globals document, clearInterval, setInterval */
// DOM de la page HTML
var dom_jeu, dom_console, dom_aide, dom_controle, dom_bouton, timer, nbClics;
// Le jeu
var vortexPiece, vortexNumero, liVide, coVide, numeroBouton, fini, rand;

//============= Console d'information =============
function afficherSurConsole(html, style) {
	if (style) {
		dom_console.className = style;
	} else {
		dom_console.className = null;
	}
	dom_console.innerHTML = html;
}

//================== actualiserPieces ==================
function actualiserPieces() {
	var li, co;
	for (li = 0; li < 3; li += 1) {
		for (co = 0; co < 3; co += 1) {
			vortexPiece[li][co].innerHTML = String(vortexNumero[li][co]);
			if (fini) {
				vortexPiece[li][co].className = "piece bravo";
			}
		}
	}
}

//============= ajouterTDpiece =============
function ajouterTDpiece(noeud, li, co) {
	var laDiv, element;
	element = document.createElement("td");
	laDiv = document.createElement("div");
	laDiv.className = "piece";
	laDiv.innerHTML = String(vortexNumero[li][co]);
	element.appendChild(laDiv);
	noeud.appendChild(element);
	vortexPiece[li][co] = laDiv;
}

//============= ajouterTDvide =============
function ajouterTDvide(noeud) {
	noeud.appendChild(document.createElement("td"));
}

//============= ajouterTDbouton =============
function ajouterTDbouton(noeud, n) {
	var bouton, element;
	element = document.createElement("td");
	bouton = document.createElement("button");
	bouton.setAttribute("onmouseover", 'entrerBtn(' + n + ')');
	bouton.setAttribute("onmouseout", 'sortirBtn(' + n + ')');
	bouton.setAttribute("onclick", 'clicBtn(' + n + ')');
	bouton.className = "rot"; 
	bouton.innerHTML = '<img src="../images/btn' + numeroBouton[n] + '.png">';
	element.appendChild(bouton);
	noeud.appendChild(element);
	dom_bouton[n] = bouton;
}

//================== initJeu ==================
function initJeu() {
	var dom_table, dom_tody, dom_tr;
	vortexPiece = [[null, null, null], [null, null, null], [null, null, null]];
	vortexNumero = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
	dom_bouton = [null, null, null, null];
	numeroBouton =  [0, 0, 0, 0];
	dom_table = document.createElement("table");
	dom_table.setAttribute("align", "center");
	dom_table.setAttribute("cellspacing", "0");
	dom_table.setAttribute("cellpadding", "0");
	dom_table.setAttribute("border", "0");
	dom_jeu.appendChild(dom_table);
	dom_tody = document.createElement("tbody");
	// ligne 0
	dom_tr = document.createElement("tr");
	ajouterTDpiece(dom_tr, 0, 0);
	ajouterTDvide(dom_tr);
	ajouterTDpiece(dom_tr, 0, 1);
	ajouterTDvide(dom_tr);
	ajouterTDpiece(dom_tr, 0, 2);
	dom_tody.appendChild(dom_tr);
	// ligne boutons NO et NE
	dom_tr = document.createElement("tr");
	ajouterTDvide(dom_tr);
	ajouterTDbouton(dom_tr, 0);
	ajouterTDvide(dom_tr);
	ajouterTDbouton(dom_tr, 1);
	ajouterTDvide(dom_tr);
	dom_tody.appendChild(dom_tr);
	// ligne 1
	dom_tr = document.createElement("tr");
	ajouterTDpiece(dom_tr, 1, 0);
	ajouterTDvide(dom_tr);
	ajouterTDpiece(dom_tr, 1, 1);
	ajouterTDvide(dom_tr);
	ajouterTDpiece(dom_tr, 1, 2);
	dom_tody.appendChild(dom_tr);
	// ligne boutons SO et SE
	dom_tr = document.createElement("tr");
	ajouterTDvide(dom_tr);
	ajouterTDbouton(dom_tr, 2);
	ajouterTDvide(dom_tr);
	ajouterTDbouton(dom_tr, 3);
	ajouterTDvide(dom_tr);
	dom_tody.appendChild(dom_tr);
	/// ligne 2
	dom_tr = document.createElement("tr");
	ajouterTDpiece(dom_tr, 2, 0);
	ajouterTDvide(dom_tr);
	ajouterTDpiece(dom_tr, 2, 1);
	ajouterTDvide(dom_tr);
	ajouterTDpiece(dom_tr, 2, 2);
	dom_tody.appendChild(dom_tr);
	// fin
	dom_table.appendChild(dom_tody);
	
	rand = Math.floor(Math.random() * 100);
	for(var i=0; i<rand; i++){
		tourner(Math.floor(Math.random() * 4));
		actualiserPieces();
	}
	var li, co;
	for (li = 0; li < 3; li += 1) {
		for (co = 0; co < 3; co += 1) {
			vortexPiece[li][co].className = "piece";
		}
	}
	fini = false;
	actualiserPieces();
	nbClics = 0;
}

//================== verifierSolution ==================
function verifierSolution() {
	var li, co, n;
	n = 0;
	for (li = 0; li < 3; li += 1) {
		for (co = 0; co < 3; co += 1) {
			if (vortexNumero[li][co] === (3 * li + co + 1)) {
				n += 1;
			}
		}
	}
	if (n === 9) {
		fini = true;
		afficherSurConsole("Bravo ! &nbsp; Terminé en " + nbClics + " Clics", "fini");
	} else {
		afficherSurConsole("Clic n° " + nbClics);
	}
}

//================== bougerPiecesPour ==================
function bougerPiecesPour(li, co) {	
	var k, s, dk;
	if ((li === liVide) && (co === coVide)) {
		return;
	} else if (li === liVide) {
		dk = co - coVide;
		s = dk < 0 ? -1 : 1;
		for (k = 0; k < s * dk; k += 1) {
			vortexNumero[li][coVide + s * k] = vortexNumero[li][coVide + s * (k + 1)];
		}
		vortexNumero[li][coVide + dk] = 0;
		coVide = co;
	} else if (co === coVide) {
		dk = li - liVide;
		s = dk < 0 ? -1 : 1;
		for (k = 0; k < s * dk; k += 1) {
			vortexNumero[liVide + s * k][co] = vortexNumero[liVide + s * (k + 1)][co];
		}
		vortexNumero[liVide + dk][co] = 0;
		liVide = li;
	} else {
		return;
	}
}

//================== CONTROLES ==================
//================== clic ==================
function tourner(n) {
	var l, c, z;
	l = n < 2 ? 0 : 1;
	c = n === 0 || n === 2 ? 0 : 1;
	z = vortexNumero[l][c];
	vortexNumero[l][c] = vortexNumero[l][c + 1];
	vortexNumero[l][c + 1] = vortexNumero[l + 1][c + 1];
	vortexNumero[l + 1][c + 1] = vortexNumero[l + 1][c];
	vortexNumero[l + 1][c] = z;
	numeroBouton[n] = (numeroBouton[n] + 1) % 4;
	dom_bouton[n].innerHTML = '<img src="../images/btn' + numeroBouton[n] + '.png">';
}

//================== clicBtn ==================
function clicBtn(n) {
	if (fini) {
		return;
	}
	nbClics += 1;
	tourner(n);
	verifierSolution();
	actualiserPieces();
}

//================== entrerBtn ==================
function entrerBtn(n) {
	var l, c;
	if (fini) {
		return;
	}
	l = n < 2 ? 0 : 1;
	c = n === 0 || n === 2 ? 0 : 1;
	vortexPiece[l][c].className = "piece mobile";
	vortexPiece[l][c + 1].className = "piece mobile";
	vortexPiece[l + 1][c].className = "piece mobile";
	vortexPiece[l + 1][c + 1].className = "piece mobile";
}

//================== sortirBtn ==================
function sortirBtn(n) {
	var l, c;
	if (fini) {
		return;
	}
	l = n < 2 ? 0 : 1;
	c = n === 0 || n === 2 ? 0 : 1;
	vortexPiece[l][c].className = "piece";
	vortexPiece[l][c + 1].className = "piece";
	vortexPiece[l + 1][c].className = "piece";
	vortexPiece[l + 1][c + 1].className = "piece";
}

//================== melanger ==================
function melanger() {
	tourner(Math.floor(Math.random() * 4));
	actualiserPieces();
}

//================== clicMelanger ==================
function clicMelanger() {
	dom_controle.innerHTML = '<button type="button" onclick="clicStopMelange()" class="btnJeu">Arrêter de mélanger</button>';
	afficherSurConsole("Mélange en cours...");
	timer = setInterval(melanger, 100);
}

//================== clicStopMelange ==================
function clicStopMelange() {
	var li, co;
	for (li = 0; li < 3; li += 1) {
		for (co = 0; co < 3; co += 1) {
			vortexPiece[li][co].className = "piece";
		}
	}
	dom_controle.innerHTML = '<button type="button" onclick="clicMelanger()" class="btnJeu">Mélanger</button>';
	clearInterval(timer);
	afficherSurConsole("À vous de jouer ...");
	fini = false;
	actualiserPieces();
	nbClics = 0;
}


//================== init ==================
function init() {
	// zone d'affichage de l'aide (bouton aide au départ)
	dom_aide = document.getElementById("aide");
	// zone d'affichage des informations (* au départ)
	dom_console = document.getElementById("console");
	// zone de contrôle du jeu (bouton de validation ou nouveau au départ)
	dom_controle = document.getElementById("controle");
	// zone de définition du jeu (vide au départ)
	dom_jeu = document.getElementById("jeu");
	initJeu();
}
