const resolveSudoku = {

  /**
   * On vérifie s'il existe des cases avec une seule possibilité et on les remplit avec cette possibilité, permeet également de résoudre les grilles les plus faciles
   * @param {Array} grille de sudoku à résoudre
  */
  simplifySudoku(grille) {
    let casesVides = 81;
    let nombreChangement = 0;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {

        if ( grille[i][j] !== 0 ) {
          casesVides --;
        } else {
          const chiffrePossible = resolveSudoku.possible(grille, i, j);
          if (chiffrePossible.length === 1 ) {
            grille[i][j] = chiffrePossible[0];
            casesVides --;
            nombreChangement ++;
          } else {
            grille[i][j] = 0;
          }
        }
      }
    }

    if (casesVides > 0 && nombreChangement > 0) {
      //si toujours des cases et si on a fait des changements
      resolveSudoku.simplifySudoku(grille);
    } if (casesVides > 0) { 
      resolveSudoku.solveSudoku(grille, 0);
    }          

  },

  /**
   * Permet de résoudre le sudoku en testant chaque solution éventuelle
   * @param {Array} grille de sudoku
   * @param {Number} position de la case testée postion = (numero ligne * 9) + numéro colonne
   * @returns grille résolu
   */
  solveSudoku(grille, position) { 
    if (position === 9*9) {
      return true;
    }

    const i = Math.floor(position/9);
    const j = position%9;

    if (grille[i][j] !== 0) {
      return resolveSudoku.solveSudoku(grille, position+1);
    }

    for (let k = 1; k < 10; k++) {
      const testColumn = !resolveSudoku.searchInColumn(grille, j, k);
      const testLigne = !resolveSudoku.searchInLigne(grille, i, k);
      const testBox = !resolveSudoku.searchInBox(grille, j, i, k);
      
      if (testBox && testColumn && testLigne) {
        grille[i][j] = k ;

        if (resolveSudoku.solveSudoku(grille, position+1)) {
          return true;
        }
      } 
    }

    grille[i][j] = 0;
    return false;
  },

  /**
   * Vérifie et retourne quel nombres sont possible dans une case donnée de la grille
   * @param {Array} grille notre grille de sudoku
   * @param {Number} numeroLigne numéro de la ligne 
   * @param {Number} numeroColonne numéro de la colonne
   * @returns possible[] tableau des valeurs possible
   */
  possible(grille, numeroLigne, numeroColonne) {
    let possible = [];
    for (let numeroPossible = 1; numeroPossible < 10; numeroPossible++) {
      if (!(resolveSudoku.searchInColumn(grille, numeroColonne, numeroPossible) || resolveSudoku.searchInBox(grille, numeroColonne, numeroLigne, numeroPossible) || resolveSudoku.searchInLigne(grille, numeroLigne, numeroPossible))) {
        possible.push(numeroPossible);
      }  
    }
    return possible;
  },

  /**
   * Recherche si un nombre donne existe dans une ligne donnée de notre grille de sudoku
   * @param {Array} grille de sudoku à résoudre
   * @param {Number} numeroLigne numéro de la ligne dans laquelle cherchée
   * @param {Number} nombreCherche numéro qu'on recherche dans la ligne
   * @returns {Boolean} true si nombre trouvé , false si pas trouvé
   */
  searchInLigne(grille, numeroLigne, nombreCherche) {
    for (let i = 0; i < 9; i++) {
      if ( grille[numeroLigne][i] === nombreCherche) {
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
    for (let i = 0; i < 9; i++) {
      if ( grille[i][numeroColonne] === nombreCherche) {
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
    for (let i = x; i < x + 3  ; i++) {
      for (let j = y; j < y+3; j++) {
        if (grille[i][j] === nombreCherche) {
          return true;
        }
      } 
    }
    return false;
  },
};