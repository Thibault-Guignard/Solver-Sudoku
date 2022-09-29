/* eslint-disable no-undef */
const createSudoku = {

  init: function() {
    createSudoku.createTable();
  },

  handleValidadteNumberClickEnter(event) {
    event.preventDefault();
    if ( event.key === 'Enter' ) { 
      document.activeElement.blur(); } 
  },

  handleValidateNumber(event) {  
    //on efface les eventuels message d'erreur
    createSudoku.eraseAlertMessageInputNumber();
    //on recupere la celle choisie
    const cellChoosen = event.currentTarget;
    //le numero saisie
    const inputNumber = cellChoosen.value;
    //la position du numéro saisie
    const positionInputNumber = cellChoosen.closest('td').getAttribute('position');
    //on vérifie si le chiffre n'est pas déjà présent dans la ligne, la colonne ou la box
    const error = createSudoku.numberIsOk(sudoku.grilleSudoku, inputNumber, positionInputNumber);
    
    if (error.length > 0) {
      createSudoku.createAlertInputNumber(error);
      cellChoosen.value = '';
    }
  },

  numberIsOk(grille, number, position) {
    let error = [];
    const ligne = Math.floor(position/9);
    const colonne = position%9;

    if (isNaN(number)) {
      error.push('Attention, vous n\' avez pas saisi de nombre.');
    } else if (number === '') {
      grille[ligne][colonne] =0 ;
    } else {
      number = parseInt(number);

      if (number < 1 || number > 9 ) {
        error.push('Vous devez choisir un chiffre entre 1 et 9.');
      } else {    
        if (resolveSudoku.searchInColumn(grille, colonne, number)) {error.push(number+ ' est déjà présent dans la colonne.') ;}
        if (resolveSudoku.searchInLigne(grille, ligne, number)) {error.push(number+ ' est déjà présent dans la ligne.') ;}
        if (resolveSudoku.searchInBox(grille, colonne, ligne, number)) {error.push(number+ ' est déjà présent dans la box.') ;}
  
        if (error.length === 0) {
          grille[ligne][colonne] = number;
        } else if (number === grille[ligne][colonne]) {
          error.splice(0,error.length);
        } else {
          grille[ligne][colonne] = 0;
        } 
      }
    }
    return error;
  },

  createAlertInputNumber(listError) {
    const emplacementAlert = document.querySelector('.grille__alert');
    listError.forEach(oneError => {
      const pAlert = document.createElement('p');
      pAlert.textContent = oneError;
      emplacementAlert.append(pAlert);
    });
    
  },

  eraseAlertMessageInputNumber() {
    const emplacementAlert = document.querySelector('.grille__alert');
    emplacementAlert.querySelectorAll('p').forEach(oldMessage => {
      oldMessage.remove();
    });
  },

  createTable() {
    const emplacementGrille = document.querySelector('.grille__sudoku');

    emplacementGrille.innerHTML = ['<table cellspacing="0"><tbody>', new Array(10).join(createSudoku.getLine()),'</tbody></table>'].join('');
    const tableSudoku = emplacementGrille.querySelector('table');

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = tableSudoku.rows[i].cells[j];
        const inputCell = cell.querySelector('input');
        cell.setAttribute('position', i*9+j);
        
        inputCell.addEventListener('keyup',createSudoku.handleValidadteNumberClickEnter);
        inputCell.addEventListener('blur',createSudoku.handleValidateNumber);
        
        if (j%3===2){cell.className='borderRightCol';}
        if (i%3===2){cell.className+=' borderBottomCol';}
        if ((i+j)%2 === 1) {cell.className+=' blue';}
      }
    }
  },

  getLine() {
    return ['<tr>', new Array(10).join('<td><input type="text" size="1" maxlength="1"></td>'),'</tr>'].join('');
  },

};