class Grille{

    constructor(){
        this.grille = [[" "," "," "],[" "," "," "],[" "," "," "]];
        this.creerDomGrille();
        this.updateGrid();
    }

	/*	--- Création de l'affichage de la grille --- */
    creerDomGrille(){
        //Récupération de la zone de jeu
        let contentGrille = document.querySelector(".content_grid");
        let compt = 0;
        //création de la grille
        let gridNode = document.createElement("div");
        gridNode.setAttribute("class", "nodeGrille");
        contentGrille.appendChild(gridNode);

		//Création de chaque case
		for(let ligne = 0; ligne < this.grille.length ; ligne++){
			for(let col = 0; col < this.grille[ligne].length; col++){
                //Création de chaque case
                let caseGrid = document.createElement("div");
                //Attributs de chaque case
                caseGrid.setAttribute("id",compt);
                caseGrid.setAttribute("width","100%");
                //a changer pour que la taille soit la meme en largeur et en longueur

				caseGrid.classList.add("caseGrid");
                gridNode.appendChild(caseGrid);
                compt +=1;
            }
        }
    }

	/*	--- Ajout d'un élément au tableau  --- */
    addElementCase(x,y,val){
        this.grille[x][y] = val;
    }

	/*	--- Supression d'un élément au tableau  --- */
    removeElementCase(x,y){
        this.grille[x][y] = " ";
    }

	/*	--- Réinitialisation du tableau  --- */
    removeGrid(){
        this.grille = [[" "," "," "],[" "," "," "],[" "," "," "]];
    }

	/*	--- Vérifie si la case est vide ou non  --- */
    isAvailable(x,y){
        return this.grille[x][y] == " ";
    }

	/*	--- Vérifie que toute les cases sont remplies --- */
    isCompleted(){
		for(let ligne = 0; ligne < this.grille.length ; ligne++){
			for(let col = 0; col < this.grille[ligne].length; col++){
               if(this.grille[ligne][col] == " "){
                   return false;
               }
            }
        }
        return true;
    }

	getCaseDispo(){
		let idCaseDispo = [];
		let parcours = 0;
		for(let ligne = 0; ligne < this.grille.length ; ligne++){
			for(let col = 0; col < this.grille[ligne].length; col++){
				if(this.isAvailable(col,ligne)){
					idCaseDispo.push(parcours);
				}
				parcours+=1;
			}
		}
		return idCaseDispo;
	}

	reset(){
		this.removeGrid();
		this.updateGrid();
	}

	/*	--- Affichage "graphique" des éléments du tableau  --- */
    updateGrid(){
        let parcours = 0;
		for(let ligne = 0; ligne < this.grille.length ; ligne++){
			for(let col = 0; col < this.grille[ligne].length; col++){
                let actualCase = document.getElementById(parcours);
                actualCase.innerHTML = this.grille[col][ligne];
                parcours+=1;
            }
        }
    }

	testVictoireLigne(i){
		if(this.grille[i][0] != this.grille[i][1] || this.grille[i][0] != this.grille[i][2] || this.isAvailable(i,0)){
			return false;
		}
		return true;
	}
	testVictoireColonne(i){
		if(this.grille[0][i] != this.grille[1][i] || this.grille[0][i] != this.grille[2][i] || this.isAvailable(0,i)){
			return false;
		}
		return true;
	}

	testVictoireDiagonale(i){
		let j = 0;
		if(i == 0){
			j = 2;
		}
		if(this.grille[0][j] != this.grille[1][1] || this.grille[0][j] != this.grille[2][i] || this.isAvailable(0,j)){
			return false;
		}
		return true;
	}

	verifVictoire(){
		for(let i = 0; i < 3; i++){
			if(this.testVictoireLigne(i) || this.testVictoireColonne(i)){
				return true;
			}
			if(i != 1){
				if(this.testVictoireDiagonale(i)){
					return true;
				}
			}
		}
		return false;
	}

	/*	--- Récupère le nombre de cases du tableau --- */
    getSize(){
        let count = 0;
		for(let ligne = 0; ligne < this.grille.length; ligne++){
			for(let col =0; col < this.grille.length[ligne]; col++){
                count += 1;
            }
       }
       return count;
    }

	/*	--- Récupère l'ensembles des "noeuds cases" du tableau  --- */
    getAllNodeCase(){
        let allCase = [];
        let numberCase = 0;
		for(let ligne = 0; ligne < this.grille.length ; ligne++){
			for(let col = 0; col < this.grille[ligne].length; col++){
                allCase.push(document.getElementById(numberCase));
                numberCase+=1;
            }
       }
       return allCase;
    }
}
