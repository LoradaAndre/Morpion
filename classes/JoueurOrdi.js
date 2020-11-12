class JoueurOrdi extends Joueur{

    constructor(name, style){
        super(name, style);
		this.afficheScore();
    }
	/*	--- Affichage du score du joueur ordi --- */
    afficheScore(){
        let zoneScore = document.getElementById("scoreJ2");
        zoneScore.innerHTML = "Score: " + this.score;
    }

	/*	--- génération de coordonnées aléatoires selon les cases disponibles --- */
	getActionBot(caseDispo){
		let alea = Math.floor(Math.random() * Math.floor(caseDispo.length));
		return caseDispo[alea];
	}

}
