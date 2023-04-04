(function() {
  const progressBar = document.querySelector('.progressbar');

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const windowScroll = window.pageYOffset;
    const progressBarWidth  = (windowScroll / windowHeight).toFixed(2);

    progressBar.setAttribute('style', `transform: scaleX(${progressBarWidth});`);
  });
})();
