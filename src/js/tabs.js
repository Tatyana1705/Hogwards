(function() {
  const tabLinks = document.querySelectorAll(".tablinks");
  const info = document.querySelectorAll(".info");

  tabLinks.forEach(function(element) {
    element.addEventListener("click", openTabs);
  });

  function openTabs(evt) {
    const btnTarget = evt.currentTarget;
    const country = btnTarget.dataset.country;

    info.forEach(function(item) {
      item.classList.remove("info-active");
    });

    tabLinks.forEach(function(item) {
      item.classList.remove("tablinks-active");
    });

    document.querySelector(`#${country}`).classList.add("info-active");

    btnTarget.classList.add("tablinks-active");
  }
})()
