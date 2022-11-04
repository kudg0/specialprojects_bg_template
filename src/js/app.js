(() => {
  //= include '_base.js'

  if (document.readyState === 'loading') {
    window.addEventListener('load', initJs)
  } else {
    initJs();
  }

  function initJs() {
    // Тут начинается твой js-код
  }

})();
