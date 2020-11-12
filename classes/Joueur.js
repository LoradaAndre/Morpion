class Joueur{

    constructor(pseudo, style){
        this.pseudo = pseudo;
        this.score = 0;
        this.style = style;
    }

	/*	--- Incrémentation du score --- */
    addScore(){
        this.score +=1;
    }

	/*	--- Remise à zéro du score --- */
    resetScore(){
        this.score = 0;
    }

	/*	--- Récupération du symbole du joueur --- */
	getJoueurActuel(){
		return this.style;
	}

	/*	--- Récupération du pseudo du joueur --- */
	getName(){
		return this.pseudo;
	}

	getScore(){
		return this.score;
	}

	setScore(newScore){
		this.score = newScore;
	}
}
