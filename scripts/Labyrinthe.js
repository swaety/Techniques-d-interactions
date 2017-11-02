/*globals Jeu */

//================== Kz ==================
function Kz(li, co, zn) {
	this.li = li;
	this.co = co;
	this.zn = zn;
	this.murN = li === 0;
	this.murW = co === 0;
	this.entree = false;
	this.sortie = false;
	this.direction = -1;
	this.voisin = [null, null, null, null];
}

Kz.ENWS = [">", "^", "<", "v", "•", "◊", "O", "X"];
Kz.ENWS = ["→", "↑", "←", "↓", "•", "◊", "O", "X"];
Kz.Vide = -1;
Kz.E = 0;
Kz.N = 1;
Kz.W = 2;
Kz.S = 3;
Kz.Point = 4;
Kz.Diamant = 5;
Kz.O = 6;
Kz.X = 7;

//============= Kz.marque =============
Kz.prototype.marque = function () {
	return this.direction > Kz.Vide && this.direction < Kz.ENWS.length ? Kz.ENWS[this.direction] : "";
};

//============= Kz.toString =============
Kz.prototype.toString = function () {
	return "Kz" + (this.entree ? "E" : "") + (this.sortie ? "S" : "") + (this.murN ? "N" : "") + (this.murW ? "W" : "") + "'" + this.marque() + "'(" + this.li + "," + this.co + ")";
};

//============= Kz.classe =============
Kz.prototype.classe = function () {
	return "kz" + (this.entree ? " entree" : "") + (this.sortie ? " sortie" : "") + (this.murN ? " murN" : "") + (this.murW ? " murW" : "") + (this.li === this.zn.li - 1 ? " murS" : "") + (this.co === this.zn.co - 1 ? " murE" : "");
};

//============= Kz.rafraichir =============
Kz.prototype.rafraichir = function () {
	this.widget.className = this.classe();
	this.widget.innerHTML = this.marque();
};

//============= Kz.verifierDirection =============
Kz.prototype.verifierDirection = function (dd) {
	if (dd < 0 || dd > 3) {
		throw new Error("Direction " + dd + " incorrecte");
	}
};

//============= Kz.marquer =============
Kz.prototype.marquer = function (n) {
	if (n > Kz.X) {
		this.direction = -1;
	} else {
		this.direction = n;
	}
	this.rafraichir();
};

//============= Kz.tournerHaut =============
Kz.prototype.tournerHaut = function () {
	
	this.direction = 1;
	this.rafraichir();
};

//============= Kz.tournerBas =============
Kz.prototype.tournerBas = function () {
	this.direction = 3;
	this.rafraichir();
};

//============= Kz.tournerGauche =============
Kz.prototype.tournerGauche = function () {
	this.direction = 2;
	this.rafraichir();
};

//============= Kz.tournerDroite =============
Kz.prototype.tournerDroite = function () {
	this.direction = 0;
	this.rafraichir();
};

//============= Kz.estVide =============
Kz.prototype.estVide = function () {
	return this.direction < 0;
};

//============= Kz.estVideVers =============
Kz.prototype.estVideVers = function (dd) {
	this.verifierDirection(dd);
	if (this.voisin[dd]) {
		return this.voisin[dd].estVide();
	}
	return false;
};

//============= Kz.murVers =============
Kz.prototype.murVers = function (dd) {
	this.verifierDirection(dd);
	switch (dd) {
	case 0: // Est
		if (this.voisin[0]) {
			return this.voisin[0].murW;
		}
		return true;
	case 1: // Nord
		return this.murN;
	case 2: // West
		return this.murW;
	case 3: // Sud
		if (this.voisin[3]) {
			return this.voisin[3].murN;
		}
		return true;
	}
};

//============= Kz.fermerMur =============
Kz.prototype.fermerMur = function (dd) {
	this.verifierDirection(dd);
	switch (dd) {
	case 0: // Est
		if (this.voisin[0]) {
			this.voisin[0].murW = true;
			this.voisin[0].rafraichir();
		}
		break;
	case 1: // Nord
		this.murN = true;
		break;
	case 2: // West
		this.murW = true;
		break;
	case 3: // Sud
		if (this.voisin[3]) {
			this.voisin[3].murN = true;
			this.voisin[3].rafraichir();
		}
		break;
	}
	this.rafraichir();
};

//============= Kz.ouvrirMur =============
Kz.prototype.ouvrirMur = function (dd) {
	this.verifierDirection(dd);
	switch (dd) {
	case 0: // Est
		if (this.voisin[0]) {
			this.voisin[0].murW = false;
			this.voisin[0].rafraichir();
		}
		break;
	case 1: // Nord
		if (this.li > 0) {
			this.murN = false;
		}
		break;
	case 2: // West
		if (this.co > 0) {
			this.murW = false;
		}
		break;
	case 3: // Sud
		if (this.voisin[3]) {
			this.voisin[3].murN = false;
			this.voisin[3].rafraichir();
		}
		break;
	}
	this.rafraichir();
};

//================== Zone ==================
function Zone(li, co) {
	var l, c, kz;
	this.li = li;
	this.co = co;
	this.liEntree = 0;
	this.coEntree = 0;
	this.liSortie = li - 1;
	this.coSortie = co - 1;
	this.liICI = 0;
	this.coICI = 0;
	this.grille = [];
	for (l = 0; l < li; l += 1) {
		this.grille[l] = [];
		for (c = 0; c < co; c += 1) {
			this.grille[l][c] = new Kz(l, c, this);
		}
	}
	this.grille[0][0].entree = true;
	this.grille[li - 1][co - 1].sortie = true;
	for (l = 0; l < li; l += 1) {
		for (c = 0; c < co; c += 1) {
			kz = this.grille[l][c];
			kz.voisin[0] = c + 1 === co ? null : this.grille[l][c + 1];
			kz.voisin[1] = l === 0 ? null : this.grille[l - 1][c];
			kz.voisin[2] = c === 0 ? null : this.grille[l][c - 1];
			kz.voisin[3] = l + 1 === li ? null : this.grille[l + 1][c];
		}
	}
}

//============= Zone.installerDans =============
Zone.prototype.installerDans = function (pere) {
	var l, c, tr;
	var t = Jeu.unElementDe(pere, "table", {classe: "zone"});
	t.setAttribute("align", "center");
	t.setAttribute("cellspacing", "0");
	t = Jeu.unElementDe(t, "tbody", {});
	t.setAttribute("valign", "middle");
	for (l = 0; l < this.li; l += 1) {
		tr = Jeu.unElementDe(t, "tr", {});
		for (c = 0; c < this.co; c += 1) {
			this.grille[l][c].widget = Jeu.unElementDe(tr, "td", {html: this.grille[l][c].marque(), classe: this.grille[l][c].classe()});
		}
	}
};

//============= Zone.rafraichir =============
Zone.prototype.rafraichir = function () {
	var l, c;
	for (l = 0; l < this.li; l += 1) {
		for (c = 0; c < this.co; c += 1) {
			this.grille[l][c].rafraichir();
		}
	}
};

//============= Zone.verifierCoordonnees =============
Zone.prototype.verifierCoordonnees = function (ll, cc) {
	if (ll < 0 || cc < 0 || ll >= this.li || cc >= this.co) {
		throw new Error("Entrée (" + ll + "," + cc + ") Hors Zone");
	}
};

//============= Zone.creerLabyrinthe =============
Zone.prototype.creerLabyrinthe = function (kz, av) {
	var k, d;
	var cav = [];
	for (k = 0; k < av.length; k += 1) {
		cav[k] = av[k];
	}
	kz.marquer(Kz.Point);
	while (cav.length > 0) {
		d = cav.pop();
		if (kz.estVideVers(d)) {
			kz.ouvrirMur(d);
			this.creerLabyrinthe(kz.voisin[d], Jeu.listeDansLeDesordre([0, 1, 2, 3]));
		}
	}
};

//============= Zone.sortieAtteinte =============
Zone.prototype.sortieAtteinte = function () {
	return this.liICI === this.liSortie && this.coICI === this.coSortie;
};

//============= Zone.raz =============
Zone.prototype.raz = function () {
	var l, c;
	for (l = 0; l < this.li; l += 1) {
		for (c = 0; c < this.co; c += 1) {
			this.grille[l][c].fermerMur(1);
			this.grille[l][c].fermerMur(2);
			this.grille[l][c].marquer(Kz.Vide);
		}
	}
	this.fixerEntree(0, 0);
	this.fixerSortie(this.li - 1, this.co - 1);
	var kz = this.grille[Jeu.entierZeroInf(this.li)][Jeu.entierZeroInf(this.co)];
	this.creerLabyrinthe(kz, Jeu.listeDansLeDesordre([0, 1, 2, 3]));
	for (l = 0; l < this.li; l += 1) {
		for (c = 0; c < this.co; c += 1) {
			this.grille[l][c].marquer(Kz.Vide);
		}
	}
	this.liICI = 0;
	this.coICI = 0;
	this.grille[0][0].marquer(Kz.E);
	this.rafraichir();
};

//============= Zone.allerVersSortie =============
Zone.prototype.allerVersSortie = function () {
	var kz = this.grille[this.liICI][this.coICI];
	var d = kz.direction;
	if (kz.murVers((d + 3) % 4)) {
		if (kz.murVers(d)) {
			this.grille[this.liICI][this.coICI].tournerPlus();
		} else {
			kz.marquer(Kz.Vide);
			kz = kz.voisin[d];
			this.liICI = kz.li;
			this.coICI = kz.co;
			this.grille[this.liICI][this.coICI].marquer(d);
		}
	} else {
		kz.marquer(Kz.Vide);
		kz = kz.voisin[(d + 3) % 4];
		this.liICI = kz.li;
		this.coICI = kz.co;
		this.grille[this.liICI][this.coICI].marquer((d + 3) % 4);
	}
};

//============= Zone.onAvance =============
Zone.prototype.onAvance = function () {
	var kz = this.grille[this.liICI][this.coICI];
	var d = kz.direction;
	if (kz.murVers(d)) {
		return false;
	} else {
		kz.marquer(Kz.Point);
		kz = kz.voisin[d];
		this.liICI = kz.li;
		this.coICI = kz.co;
		this.grille[this.liICI][this.coICI].marquer(d);
		return true;
	}
};

//============= Zone.onTourneHaut =============
Zone.prototype.onTourne1 = function () {
	this.grille[this.liICI][this.coICI].tournerHaut();
};

//============= Zone.onTourneBas =============
Zone.prototype.onTourne2 = function () {
	this.grille[this.liICI][this.coICI].tournerBas();
};

//============= Zone.onTourneGauche =============
Zone.prototype.onTourne3 = function () {
	this.grille[this.liICI][this.coICI].tournerGauche();
};

//============= Zone.onTourneDroite =============
Zone.prototype.onTourne4 = function () {
	this.grille[this.liICI][this.coICI].tournerDroite();
};

//============= Zone.fixerEntree =============
Zone.prototype.fixerEntree = function (ll, cc) {
	this.verifierCoordonnees(ll, cc);
	if (ll === this.liSortie && cc >= this.coSortie) {
		throw new Error("Entrée et Sortie confondues (" + ll + "," + cc + ")");
	}
	this.grille[this.liEntree][this.coEntree].entree = false;
	this.grille[ll][cc].entree = true;
	this.liEntree = ll;
	this.coEntree = cc;
	this.rafraichir();
};

//============= Zone.fixerSortie =============
Zone.prototype.fixerSortie = function (ll, cc) {
	this.verifierCoordonnees(ll, cc);
	if (ll === this.liEntree && cc >= this.coEntree) {
		throw new Error("Sortie et Entrée confondues (" + ll + "," + cc + ")");
	}
	this.grille[this.liSortie][this.coSortie].sortie = false;
	this.grille[ll][cc].sortie = true;
	this.liSortie = ll;
	this.coSortie = cc;
	this.rafraichir();
};

//============= Zone.marquer =============
Zone.prototype.marquer = function (ll, cc, n) {
	this.verifierCoordonnees(ll, cc);
	this.grille[ll][cc].marquer(n);
};

//============= Zone.tournerPlus =============
Zone.prototype.tournerPlus = function (ll, cc) {
	this.verifierCoordonnees(ll, cc);
	this.grille[ll][cc].tournerPlus();
};

//============= Zone.tournerMoins =============
Zone.prototype.tournerMoins = function (ll, cc) {
	this.verifierCoordonnees(ll, cc);
	this.grille[ll][cc].tournerMoins();
};

//============= Zone.estVide =============
Zone.prototype.estVide = function (ll, cc) {
	this.verifierCoordonnees(ll, cc);
	return this.grille[ll][cc].estVide();
};

//============= Zone.estVideVers =============
Zone.prototype.estVideVers = function (ll, cc, dd) {
	this.verifierCoordonnees(ll, cc);
	return this.grille[ll][cc].estVideVers(dd);
};

//============= Zone.murVers =============
Zone.prototype.murVers = function (ll, cc, dd) {
	this.verifierCoordonnees(ll, cc);
	return this.grille[ll][cc].murVers(dd);
};

//============= Zone.fermerMur =============
Zone.prototype.fermerMur = function (ll, cc, dd) {
	this.verifierCoordonnees(ll, cc);
	this.grille[ll][cc].fermerMur(dd);
};

//============= Zone.ouvrirMur =============
Zone.prototype.ouvrirMur = function (ll, cc, dd) {
	this.verifierCoordonnees(ll, cc);
	this.grille[ll][cc].ouvrirMur(dd);
};
