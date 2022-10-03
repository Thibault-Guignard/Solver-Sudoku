const resolveSudoku = {

  /**
   * On vérifie s'il existe des cases avec une seule possibilité et on les remplit avec cette possibilité, permeet également de résoudre les grilles les plus faciles
   * @param {Array} grille de sudoku à résoudre
  */
  simpleResolutionSudoku(grille) {
    let emptyCases = 81;
    let nombreChangement = 0;

    for (let ligne = 0; ligne < 9; ligne++) {
      for (let colonne = 0; colonne < 9; colonne++) {

        if ( grille[ligne][colonne] !== 0 ) {
          emptyCases --;
        } else {
          const chiffresPossible = resolveSudoku.possible(grille, ligne, colonne);
          if (chiffresPossible.length === 1 ) {
            grille[ligne][colonne] = chiffresPossible[0];
            emptyCases --;
            nombreChangement ++;
          } else {
            grille[ligne][colonne] = 0;
          }
        }
      }
    }

    if (emptyCases > 0 && nombreChangement > 0) {
      // si toujours des cases vides et si on a fait des changements, on refait un passage dans la même fonction
      resolveSudoku.simpleResolutionSudoku(grille);
    } if (emptyCases > 0) { 
      // si on a pas fait de changements dans la grille mais u'il reste des cases vides , on change de méthode
      resolveSudoku.complexeResolutionSudoku(grille, 0);
    }          
  },

  /**
   * Permet de résoudre le sudoku en testant chaque solution éventuelle
   * @param {Array} grille de sudoku
   * @param {Number} position de la case testée postion = (numero ligne * 9) + numéro colonne
   * @returns grille résolu
   */
  complexeResolutionSudoku(grille, position) { 
    //si  on est à la dernière position on a fini le parcours de la grille
    if (position === 9*9) {
      return true;
    }

    //calcul du numéro de ligne et du numéro de colonne
    const numeroLigne = Math.floor(position/9);
    const numeroColonne = position%9;

    //si la case a déjà un nombre saisi on passe au nombre suivant
    if (grille[numeroLigne][numeroColonne] !== 0) {
      return resolveSudoku.complexeResolutionSudoku(grille, position+1);
    }

    //coeur de la résolution, pour la position p on teste les chiffres possible et on avance d'une posistion, si ca match on continue sinon on revient en arrière
    //et on teste un autre chiffre possible ainsi de suite
    for (let k = 1; k < 10; k++) {

      if (!resolveSudoku.searchInBox(grille, numeroColonne, numeroLigne, k) &&
          !resolveSudoku.searchInColumn(grille, numeroColonne, k) &&
          !resolveSudoku.searchInLigne(grille, numeroLigne, k) ) {

        grille[numeroLigne][numeroColonne] = k ;

        if (resolveSudoku.complexeResolutionSudoku(grille, position+1)) {
          return true;
        }
      } 
    }

    grille[numeroLigne][numeroColonne] = 0;
    return false;
  },

  /**
   * Vérifie et retourne quel nombres sont possible dans une case donnée de la grille
   * @param {Array} grille notre grille de sudoku
   * @param {Number} numeroLigne numéro de la ligne 
   * @param {Number} numeroColonne numéro de la colonne
   * @returns chiffresPossible[] tableau des valeurs possible
   */
  possible(grille, numeroLigne, numeroColonne) {
    let chiffresPossible = [];
    for (let numero = 1; numero < 10; numero++) {
      if (!(resolveSudoku.searchInColumn(grille, numeroColonne, numero) ||
            resolveSudoku.searchInBox(grille, numeroColonne, numeroLigne, numero) || 
            resolveSudoku.searchInLigne(grille, numeroLigne, numero))) {
        chiffresPossible.push(numero);
      }  
    }
    return chiffresPossible;
  },

  /**
   * Recherche si un nombre donne existe dans une ligne donnée de notre grille de sudoku
   * @param {Array} grille de sudoku à résoudre
   * @param {Number} numeroLigne numéro de la ligne dans laquelle cherchée
   * @param {Number} nombreCherche numéro qu'on recherche dans la ligne
   * @returns {Boolean} true si nombre trouvé , false si pas trouvé
   */
  searchInLigne(grille, numeroLigne, nombreCherche) {
    for (let colonne = 0; colonne < 9; colonne++) {
      if ( grille[numeroLigne][colonne] === nombreCherche) {
        return true;
      }
    }
    return false;
  },
      
  /**
   * Recherche si un nombre donne existe dans une colonne donnée de notre grille de sudoku
   * @param {Array} grille
   * @param {Number} numeroColonne numéro de la colonne dans laquelle cherchée
   * @param {Number} nombreCherche numéro qu'on recherche dans la colonne
   * @returns {Boolean} true si nombre trouvé , false si pas trouvé
   */
  searchInColumn(grille, numeroColonne, nombreCherche) {
    for (let ligne = 0; ligne < 9; ligne++) {
      if ( grille[ligne][numeroColonne] === nombreCherche) {
        return true;
      }
    }
    return false;
  },

  /**
   * Vérifier si une valeur existe dèja dans une box donnée
   * @param {Array} grille de sudoku à résoudre
   * @param {Number} numeroColonne indice de la colonne dans lequel on va vérifier si le chiffre est présent
   * @param {Number} numeroLigne indice de la ligne dans lequel on va vérifier si le chiffre est présent
   * @param {Number} nombreCherche numéro qu'on recherche dans la grille
   * @returns {Boolean} true si nombre trouvé, false si pas trouvé
   */
  searchInBox(grille, numeroColonne, numeroLigne, nombreCherche) {
    const x = numeroLigne - numeroLigne%3;
    const y = numeroColonne - numeroColonne%3;
    for (let ligne = x; ligne < x + 3  ; ligne++) {
      for (let colonne = y; colonne < y+3; colonne++) {
        if (grille[ligne][colonne] === nombreCherche) {
          return true;
        }
      } 
    }
    return false;
  },
  
};