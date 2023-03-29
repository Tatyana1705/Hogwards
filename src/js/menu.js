(function() {
  const menu = document.querySelector('.menu');
  const burgerBtn = menu.querySelector('.burger');

  burgerBtn.addEventListener('click', ()=>{
    menu.classList.toggle('menu--open');
  });
})();
