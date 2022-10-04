/* eslint-disable no-undef */
const createSudoku = {

  init: function() {
    createSudoku.createTable();
  },

  /**
   * clique sur le bouton entrer simule le blur sur le même input
   * @param {event} event 
   */
  handleValidadteNumberClickEnter(event) {
    event.preventDefault();
    if ( event.key === 'Enter' ) { 
      document.activeElement.blur(); } 
  },

  /**
   * Après saisie du nombre, le contrôle si tout est ok , on le valide sinon on l'efface et on affiche message d'erreur(s)
   * @param {event} event 
   */
  handleValidateNumber(event) {  
    //on efface les eventuels message d'erreur
    alertMessage.eraseAlertMessage();

    //on recupere la cellule choisie
    const cellChoosen = event.currentTarget;
    const inputNumber = cellChoosen.value;
    const positionInputNumber = cellChoosen.closest('td').getAttribute('position');

    //on vérifie si le chiffre n'est pas déjà présent dans la ligne, la colonne ou la box
    const listErrors = createSudoku.numberIsOk(sudoku.grilleSudoku, inputNumber, positionInputNumber);
    
    if (listErrors.length > 0) {
      alertMessage.createAlertMessage(listErrors, 'warning');
      cellChoosen.value = '';
    }
  },

  /**
   * Teste la saisie dans une case
   * @param {Array} grille 
   * @param {Number} number 
   * @param {Number} position 
   * @returns {Array} Error[] 
   */
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

  /**
   * Gère l'affichage de la grille de sudoku
   */
  createTable() {
    const emplacementGrille = document.querySelector('.grille__sudoku');

    emplacementGrille.innerHTML = ['<table cellspacing="0"><tbody>', new Array(10).join(createSudoku.getLine()),'</tbody></table>'].join('');
    const tableSudoku = emplacementGrille.querySelector('table');

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = tableSudoku.rows[i].cells[j];
        const inputCell = cell.querySelector('input');
        const labelCell = cell.querySelector('label');
        cell.setAttribute('position', i*9+j);
        
        labelCell.setAttribute('id', 'case-' + i*9+j);
        inputCell.setAttribute('id', 'case-' + i*9+j);
        //on ajoute les evenements sur les inputs de notre grille
        inputCell.addEventListener('keyup',createSudoku.handleValidadteNumberClickEnter);
        inputCell.addEventListener('blur',createSudoku.handleValidateNumber);
        
        //mise en place du CSS
        if (j%3 === 2){ cell.classList.add('borderRightCol') ;}
        if (i%3 === 2){ cell.classList.add('borderBottomCol') ;}
        if ((i+j)%2 === 1) { cell.classList.add('blue') ;}
      }
    }
  },

  /**
   * Gère la création d'une ligne
   * @returns 
   */
  getLine() {
    return ['<tr>', new Array(10).join('<td><label></label><input type="text" size="1" maxlength="1"></td>'),'</tr>'].join('');
  },
  
};