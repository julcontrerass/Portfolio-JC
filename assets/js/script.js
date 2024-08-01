/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * NAVBAR
 * navbar toggle for mobile
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggleBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * header active when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function (currentSlider) {

  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
  let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
   * NEXT SLIDE
   */
  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlidableItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidableItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSlidableItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = 'none';
    sliderPrevBtn.style.display = 'none';
  }

  /**
   * slide with [shift + mouse wheel]
   */

  currentSlider.addEventListener("wheel", function (event) {
    if (event.shiftKey && event.deltaY > 0) slideNext();
    if (event.shiftKey && event.deltaY < 0) slidePrev();
  });

  /**
   * RESPONSIVE
   */

  window.addEventListener("resize", function () {
    totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
    totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem();
  });

}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }


/**
 * aviso de mail 
 */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  // Mensajes en diferentes idiomas
  const messages = {
    en: {
      success: "Your message has been sent successfully!",
      error: "There was an error sending your message. Please try again.",
    },
    es: {
      success: "¡Tu mensaje ha sido enviado exitosamente!",
      error: "Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.",
    },
  };

  // Detectar el idioma del navegador
  const userLang = navigator.language || navigator.userLanguage;
  const lang = userLang.startsWith("es") ? "es" : "en"; // Asume inglés por defecto

  // Evento de envío del formulario
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Previene el envío por defecto

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
    })
      .then((response) => {
        if (response.ok) {
          alert(messages[lang].success); // Muestra mensaje de éxito en el idioma correspondiente
        } else {
          alert(messages[lang].error); // Muestra mensaje de error en el idioma correspondiente
        }
      })
      .catch(() => {
        alert(messages[lang].error); // Muestra mensaje de error en caso de excepción
      });
  });
});

// /**
//  *  ScrollReveal
//  */

document.addEventListener("DOMContentLoaded", function () {
  ScrollReveal().reveal(".blog-card", {
    duration: 1000, // Duración de la animación en milisegundos
    origin: "bottom", // Desde dónde viene la animación (top, bottom, left, right)
    distance: "50px", // Distancia que recorrerá el elemento
    delay: 200, // Retraso antes de que la animación comience
    reset: true, // Si deseas que la animación se repita al hacer scroll
  });
  ScrollReveal().reveal(".reveal", {
    duration: 1000,
    origin: "top",
    distance: "50px",
    delay: 200,
    reset: true,
  });
});
