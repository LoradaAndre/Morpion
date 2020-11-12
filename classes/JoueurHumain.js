class JoueurHumain extends Joueur{

    constructor(pseudo, style){
        super(pseudo, style);
		this.zoneScore = document.getElementById("scoreJ1")
        this.affichePseudo();
        this.afficheScore();
    }

	/*	--- Récupération du pseudo du joueur --- */
    affichePseudo(){
        let zonePseudo = document.getElementById("pseudoJ1");
        zonePseudo.innerHTML = this.pseudo;
    }

	/*	--- Affichage du score du joueur humain --- */
	afficheScore(){
        let zoneScore = document.getElementById("scoreJ1");
        zoneScore.innerHTML = "Score: " + this.score;
    }
}
