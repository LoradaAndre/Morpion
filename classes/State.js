class State{

    constructor(){

		//Création de la grille
		this.grille = new Grille();

		//Demande de pseudo au joueur
		this.nameJoueur = window.prompt("Quel pseudonyme voulez-vous choisir?");

		//Création des deux joueurs (nous + ordi)
		this.j1 = new JoueurHumain(this.nameJoueur, "X");
		this.jOrdi = new JoueurOrdi("l'ordinateur", "O");

		//Récupération du stockage local
		this.recupPartie();

		//Génération aléatoire pour définir qui commence à jouer
		let alea = Math.floor(Math.random() * Math.floor(2));
		console.log(alea);

		if(alea == 1){
			this.actualPlayer = this.jOrdi;
			//faire jouer l'ia
			this.jouer();
		}else{
			this.actualPlayer = this.j1;
		}
			this.listenerCase();
			this.listenerRules();
    }

	/*	--- Sauvegarde d'une partie --- */
	sauvegardePartie(){
			localStorage.setItem("username", this.nameJoueur);
			localStorage.setItem("scoreHumain", this.j1.getScore());
			localStorage.setItem("scoreOrdi", this.jOrdi.getScore());
	}

	/*	--- Récupération des données d'une partie selon le nom d'utilisateur --- */
	recupPartie(){
		if(localStorage.getItem("username") == this.nameJoueur){
			this.j1.setScore(localStorage.getItem("scoreHumain"));
			this.jOrdi.setScore(localStorage.getItem("scoreOrdi"));
		}
		this.j1.afficheScore();
		this.jOrdi.afficheScore();
	}

	/*	--- Change le joueur actuel  --- */
	setActualPlayer(){
		if(this.actualPlayer == this.j1){
			this.actualPlayer = this.jOrdi;
		}else{
			this.actualPlayer = this.j1;
		}
	}

	/*	--- Action de jouer  --- */
	jouer(){
		let coordX;
		let coordY;

		//En cas du tour du joueur
		if(this.actualPlayer instanceof JoueurHumain){
			//récupération des coordonées cliquées
			coordX = event.target.id % 3;
			coordY =  Math.trunc(event.target.id / 3);

			//si la case est vide
			if(event.target.innerHTML == " "){
				//Ajout de l'élément à la case
				this.grille.addElementCase(coordX,coordY,this.actualPlayer.getJoueurActuel());

				//refresh du tableau
				this.grille.updateGrid();
				this.etatDeJeu();
				//On change de joueur après l'action
				this.setActualPlayer();
			}
		}
		//En cas du tour de l'ordianteur
		 if(this.actualPlayer instanceof JoueurOrdi){
			//génération de coordonnées aléatoires selon les cases disponibles
			let actionBot = this.actualPlayer.getActionBot(this.grille.getCaseDispo());
			//récupération de ces coordonnées
			coordX = actionBot % 3;
			coordY =  Math.trunc(actionBot / 3);
			//Ajout de l'élément à la case
			this.grille.addElementCase(coordX,coordY,this.actualPlayer.getJoueurActuel());

			this.grille.updateGrid();
			this.etatDeJeu();
			this.setActualPlayer();
		 }
		 this.sauvegardePartie();
	}
	/*	--- Vérification de si on a un état gagnant  --- */
	etatDeJeu(){
		if(this.grille.verifVictoire()){
			alert("et c'est une victoire pour " + this.actualPlayer.getName());
			this.actualPlayer.addScore();
			this.actualPlayer.afficheScore();
			this.grille.reset();
		}
		if(this.grille.isCompleted()){
			alert("Match nul")
			this.grille.reset();
		}
	}

	/*	--- Écoute d'événements --- */
	listenerCase(){
		console.log(this.actualPlayer.getJoueurActuel());
		let liste = this.grille.getAllNodeCase();
		for(let i in liste){
			liste[i].addEventListener("click", this.jouer.bind(this), false);
		}
	}

	/*	--- ecoute evenement règles  --- */
	listenerRules(){
		let motRules = document.getElementById("rules");
		motRules.addEventListener("mouseover", this.afficherRules);
		motRules.addEventListener("mouseout", this.cacherRules);
	}

	/*	--- afficher les règles --- */
	afficherRules(){
		let rules = document.querySelector("footer");
		rules.style.display = "block";
	}

	/*	--- cacher les règles --- */
	cacherRules(){
		let rules = document.querySelector("footer");
		rules.style.display = "none";
	}
}
