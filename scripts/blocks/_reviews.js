document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".reviews__slider-list");
  const btnPrev = document.querySelector(".reviews__arrow-button-prev");
  const btnNext = document.querySelector(".reviews__arrow-button-next");
  const buttons = document.querySelectorAll(".pagination__button");

  const cardWidth = 370 + 30; 
  const scrollAmount = cardWidth;

  
  slider.style.overflowX = "hidden";

  function scrollSlider(amount) {
    slider.scrollBy({
      left: amount,
      behavior: "smooth",
    });
    updatePagination();
  }

 
  function prevHandler() {
    scrollSlider(-scrollAmount);
  }

  function nextHandler() {
    scrollSlider(scrollAmount);
  }

 
  function handleArrowButtons() {
    const isDesktop = window.innerWidth >= 1023;

    if (isDesktop) {
      btnPrev.addEventListener("click", prevHandler);
      btnNext.addEventListener("click", nextHandler);
      btnPrev.style.pointerEvents = "auto";
      btnNext.style.pointerEvents = "auto";
      btnPrev.style.opacity = "1";
      btnNext.style.opacity = "1";
    } else {
      btnPrev.removeEventListener("click", prevHandler);
      btnNext.removeEventListener("click", nextHandler);
      btnPrev.style.pointerEvents = "none";
      btnNext.style.pointerEvents = "none";
      btnPrev.style.opacity = "0.4";
      btnNext.style.opacity = "0.4";
    }
  }


  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (window.innerWidth >= 1023) return; 

      buttons.forEach(b => b.classList.remove("pagination__button--active"));
      btn.classList.add("pagination__button--active");

      const targetScroll = index * scrollAmount;
      slider.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    });
  });

 
  function updatePagination() {
    if (window.innerWidth >= 1024) return;
    const index = Math.round(slider.scrollLeft / scrollAmount);
    buttons.forEach(b => b.classList.remove("pagination__button--active"));
    if (buttons[index]) buttons[index].classList.add("pagination__button--active");
  }


  handleArrowButtons();
  window.addEventListener("resize", handleArrowButtons);
});
