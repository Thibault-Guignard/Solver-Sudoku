// eslint-disable-next-line no-unused-vars
const alertMessage = {

  createAlertMessage(listErrors, state) {
    const emplacementAlert = document.querySelector('.grille__alert');
    emplacementAlert.classList.add('grille__alert--' + state);
    listErrors.forEach(oneError => {
      const pAlert = document.createElement('p');
      pAlert.textContent = oneError;
      emplacementAlert.append(pAlert);
    });
  },

  eraseAlertMessage() {
    const emplacementAlert = document.querySelector('.grille__alert');
    emplacementAlert.className = 'grille__alert';
    emplacementAlert.querySelectorAll('p').forEach(oldMessage => {
      oldMessage.remove();
    });
  },
  
};