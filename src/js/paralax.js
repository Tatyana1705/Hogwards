import * as basicScroll from 'basicscroll';

(function() {
  const layers = document.querySelectorAll('.keyart__layer');

  layers.forEach((elem) => {
    const modifier = elem.getAttribute('data-modifier');

    const instans = basicScroll.default.create({
      elem,
      from: 0,
      to: 519,
      direct: true,
      props: {
        '--translateY': {
          from: '0',
          to: `${ 10 * modifier }px`
        }
      }
    });


    instans.start();

  });
})();
