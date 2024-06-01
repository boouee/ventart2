import { Swiper } from "swiper";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import { FreeMode, EffectFade, Grid } from "swiper/modules";

import { eqItems } from "./equip";
Swiper.use([Navigation]);
new Swiper(".new__slider", {
  modules: [Navigation, Pagination],
  slidesPerView: "auto",
  spaceBetween: 20,
  watchSlidesProgress: true,
  slidesPerGroup: 1,
  navigation: {
    prevEl: ".new__btn--prev",
    nextEl: ".new__btn--next",
  },
  pagination: {
    el: ".new__pagination .swiper-pagination",
    type: "progressbar",
  },
});
let mouse = true;

window.addEventListener("DOMContentLoaded", () => {
  const resizableSwiper = (
    breakpoint,
    swiperClass,
    swiperSettings,
    callback
  ) => {
    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function (className, settings) {
      swiper = new Swiper(className, settings);

      if (callback) {
        callback(swiper);
      }
    };

    const checker = function () {
      if (breakpoint.matches) {
        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
      }
    };

    breakpoint.addEventListener("change", checker);
    checker();
  };
  const header = document.querySelector(".header");
  // const headerMob = document.querySelector(".header-mob");
  const mBtn = document.querySelector(".header__m");
  const menu = document.querySelector(".menu");
  const siteContainer = document.querySelector(".site-container");

  const menuBtn = document.querySelector(".burger");
  const eqMenuBtn = document.querySelector(".eq__menu");

  function defaultMenu() {
    let isActive = menu.classList.toggle("active");
    siteContainer.classList.toggle("menu-active");

    document.body.style.overflow = isActive ? "hidden" : null;
  }

  function progressMenu() {
    let isActive = menu.classList.toggle("active");

    document.body.style.overflow = isActive ? "hidden" : null;

    setTimeout(() => {
      header.style.transform = isActive ? "translateY(0)" : "translateY(-110%)";
      siteContainer.classList.toggle("menu-active");
    }, 600);
  }
  menuBtn.addEventListener("click", defaultMenu);

  eqMenuBtn.addEventListener("click", (e) => {
    let isActive = menu.classList.toggle("active");
    siteContainer.classList.toggle("menu-active");

    header.style.transform = isActive ? "translateY(0)" : "translateY(-110%)";
    document.body.style.overflow = isActive ? "hidden" : null;
  });
  const someFunc = (instance) => {
    if (instance && window.matchMedia("(min-width: 1025px").matches) {
      instance.on("slideChange", function (e) {
        if (instance.activeIndex == 0) {
          header.style.transform = null;
          header.classList.remove("logo-down");
          header.classList.remove("is-third");
          header.classList.remove("active");
          mBtn.classList.remove("active");
        } else {
          header.style.transform = "translateY(-50%)";
          header.classList.add("logo-down");
          header.classList.add("is-third");
        }
      });
    } else {
      instance.on("slideChange", function (e) {
        if (instance.activeIndex == 1) {
          header.style.transform = "translateY(-110%)";
          menuBtn.removeEventListener("click", defaultMenu);
          menuBtn.addEventListener("click", progressMenu);
        } else {
          header.style.transform = null;
          menuBtn.removeEventListener("click", progressMenu);
          menuBtn.addEventListener("click", defaultMenu);
        }
      });
    }
  };

  resizableSwiper(
    "(min-width: 320px)",
    ".main-slider",
    {
      modules: [Mousewheel, FreeMode],
      slidesPerView: 1,
      speed: 800,
      direction: "vertical",
      mousewheelControl: mouse,
      mousewheel: {
        noMousewheelClass: "nowheel",
        releaseOnEdges: true,
      },
    },
    someFunc
  );

  resizableSwiper("(min-width: 320px)", ".popular__slider--pop", {
    modules: [Navigation, Grid],
    slidesPerView: 5,
    speed: 600,
    navigation: {
      prevEl: ".pop-prev",
      nextEl: ".pop-next",
    },
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 10,
        grid: {
          fill: "row",
          rows: 2,
        },
      },
      1025: {
        slidesPerView: 5,
        spaceBetween: 0,
        grid: null,
      },
    },
  });

  resizableSwiper("(min-width: 320px)", ".cat__slider", {
    modules: [Navigation, Grid],
    slidesPerView: "auto",
    speed: 600,
    navigation: {
      prevEl: ".cat-prev",
      nextEl: ".cat-next",
    },
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 10,
        grid: {
          fill: "row",
          rows: 2,
        },
      },
      1025: {
        slidesPerView: "auto",
        spaceBetween: 0,
        grid: null,
      },
    },
  });
  const slides = document.querySelectorAll(
    ".main-slider>.swiper-wrapper>.swiper-slide"
  );
  const lastSlide = slides[2];

  lastSlide.addEventListener("scroll", (e) => {
    if (lastSlide.scrollTop > 0) {
      lastSlide.classList.add("nowheel");
    } else if (lastSlide.scrollTop === 0) {
      lastSlide.classList.remove("nowheel");
    }
  });
});
let eqSlider = null;
if (window.matchMedia("(max-width: 1024px)").matches) {
  // const eqItems = new Swiper(".equipment__slider-items", {
  //   slidesPerView: 1,
  //   modules: [EffectFade],

  //   speed: 600,

  //   effect: "fade",
  //   fadeEffect: {
  //     crossFade: true,
  //   },
  // });

  eqSlider = new Swiper(".equipment__slider", {
    modules: [Pagination],
    slidesPerView: 1,
    pagination: {
      el: ".equipment__pagination",
    },
    speed: 600,

    on: {
      slideChange: (swiper) => {
        eqItems.forEach((el) => el.classList.remove("active"));
        eqItems[swiper.activeIndex].classList.add("active");
      },
    },
  });
  const prevBtn = document.querySelector(".equipment__arr--prev");
  const nextBtn = document.querySelector(".equipment__arr--next");
  prevBtn.addEventListener("click", (e) => {
    eqSlider.slidePrev();
  });
  nextBtn.addEventListener("click", (e) => {
    eqSlider.slideNext();
  });
  // eqSlider.on("slideChange", (swiper) => {
  //   eqItems.slideTo(swiper.activeIndex);
  // });
  // eqItems.on("slideChange", (swiper) => {
  //   eqSlider.slideTo(swiper.activeIndex);
  // });
}

export { eqSlider };
