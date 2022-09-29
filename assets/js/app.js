/* eslint-disable no-undef */
const app = {

  init: function() {
    createSudoku.init();
    sudoku.init();
  },
  
};

document.addEventListener('DOMContentLoaded',app.init);