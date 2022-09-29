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

  handleClickResolveSudoku() {
    createSudoku.eraseAlertMessageInputNumber();
    resolveSudoku.simplifySudoku(sudoku.grilleSudoku);
    sudoku.remplirTable(sudoku.grilleSudoku);
  },

  remplirTable(grille) {
    const emplacementGrille = document.querySelector('.grille__sudoku');
    const tableSudoku = emplacementGrille.querySelector('table');
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = tableSudoku.rows[i].cells[j];
        const inputCell = cell.querySelector('input');
        inputCell.value = grille[i][j];
      }
    }
  },

  handleClickResetButton() {
    const emplacementGrille = document.querySelector('.grille__sudoku');
    const tableSudoku = emplacementGrille.querySelector('table');
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = tableSudoku.rows[i].cells[j];
        const inputCell = cell.querySelector('input');
        inputCell.value = '';
        sudoku.grilleSudoku[i][j] = 0;
      }
    }
    createSudoku.eraseAlertMessageInputNumber();
  }
};