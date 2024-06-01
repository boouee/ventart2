import { eqSlider } from "./sliders";

const eqItems = document.querySelectorAll(".equip");
const eqImages = document.querySelectorAll(".equipment__image");

function clearActive() {
  eqItems.forEach((el) => el.classList.remove("active"));
  eqImages.forEach((el) => el.classList.remove("active"));
}
eqItems.forEach((el, index) => {
  el.addEventListener("mouseenter", (e) => {
    clearActive();
    const dataset = el.dataset.tab;
    document
      .querySelector(`.equipment__image[data-tab="${dataset}"]`)
      .classList.add("active");
    el.classList.add("active");

    if (eqSlider) {
      eqSlider.slideTo(index);
    }
  });
  el.addEventListener("click", (e) => {
    clearActive();
    const dataset = el.dataset.tab;
    document
      .querySelector(`.equipment__image[data-tab="${dataset}"]`)
      .classList.add("active");
    el.classList.add("active");

    if (eqSlider) {
      eqSlider.slideTo(index);
    }
  });
});

export { eqItems };
