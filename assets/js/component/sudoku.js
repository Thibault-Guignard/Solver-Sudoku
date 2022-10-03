/* eslint-disable no-undef */
const sudoku = {

  grilleSudoku: [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],    
  ],

  init: function() {
    //bouton résoudre sudoku
    const buttonResolveSudoku = document.querySelector('.button__resolve');
    buttonResolveSudoku.addEventListener('click', sudoku.handleClickResolveSudoku);
    //bouton réinitialiser sudoku
    const buttonReset = document.querySelector('.button__reset');
    buttonReset.addEventListener('click', sudoku.handleClickResetButton);
  },

  /**
   * On traite la grille saisie
   */
  handleClickResolveSudoku() {
    alertMessage.eraseAlertMessage();
    resolveSudoku.simpleResolutionSudoku(sudoku.grilleSudoku);
    sudoku.remplirTable(sudoku.grilleSudoku);
  },

  /**
   * Remplit le sudoku avec notre grille résolu
   * @param {Array} grilleSolved notre grille résolu
   */
  remplirTable(grilleSolved) {
    const emplacementGrille = document.querySelector('.grille__sudoku');
    const tableSudoku = emplacementGrille.querySelector('table');
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = tableSudoku.rows[i].cells[j];
        const inputCell = cell.querySelector('input');
        inputCell.value = grilleSolved[i][j];
      }
    }
    alertMessage.createAlertMessage(['Sudoku résolu'], 'success');
  },

  /**
   * Reinitialise les grilles de sudoku , affichage + codes
   */
  handleClickResetButton() {
    const emplacementGrille = document.querySelector('.grille__sudoku');
    const tableSudoku = emplacementGrille.querySelector('table');
    for (let ligne = 0; ligne < 9; ligne++) {
      for (let colonne = 0; colonne < 9; colonne++) {
        const cell = tableSudoku.rows[ligne].cells[colonne];
        const inputCell = cell.querySelector('input');
        inputCell.value = '';
        sudoku.grilleSudoku[ligne][colonne] = 0;
      }
    }
    alertMessage.eraseAlertMessage();
  },
  
};