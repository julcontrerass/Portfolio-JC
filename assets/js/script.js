/**
 * Web Analytics
 */
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://cdn.vercel-insights.com/v1/script.js";
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"vercel","script");
vercel("init", { projectId: "juliancontreras-portfolio.vercel.app" });

/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

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
const navbarLinks = document.querySelectorAll(".navbar-link");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggleBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

// Add click event to navbar togglers
navTogglers.forEach((toggler) => {
  toggler.addEventListener("click", toggleNavbar);
});

// Add click event to navbar links
navbarLinks.forEach((link) => {
  link.addEventListener("click", function () {
    if (navbar.classList.contains("active")) {
      toggleNavbar();
    }
  });
});

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
  const sliderContainer = currentSlider.querySelector(
    "[data-slider-container]"
  );
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let totalSliderVisibleItems = Number(
    getComputedStyle(currentSlider).getPropertyValue("--slider-items")
  );
  let totalSlidableItems =
    sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  };

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
  };

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
  };

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSlidableItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
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
    totalSliderVisibleItems = Number(
      getComputedStyle(currentSlider).getPropertyValue("--slider-items")
    );
    totalSlidableItems =
      sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem();
  });
};

for (let i = 0, len = sliders.length; i < len; i++) {
  initSlider(sliders[i]);
}


/**
   * EMAil
   */
document.getElementById('contactForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  Swal.fire({
    title: 'Enviando...',
    text: 'Por favor, espera un momento.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      Swal.fire({
        title: '¡Éxito!',
        text: 'Mensaje enviado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      form.reset();
    } else {
      throw new Error('Error en el envío del formulario');
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
});


/**
 *  ScrollReveal
*/

document.addEventListener('DOMContentLoaded', function() {
  ScrollReveal().reveal('.blog-card', {
    duration: 1000,  // Duración de la animación en milisegundos
    origin: 'bottom',  // Desde dónde viene la animación (top, bottom, left, right)
    distance: '50px',  // Distancia que recorrerá el elemento
    delay: 200,  // Retraso antes de que la animación comience
    reset: true  // Si deseas que la animación se repita al hacer scroll
});
  
  ScrollReveal().reveal('.reveal', {
      duration: 1000,
      origin: 'top',
      distance: '50px',
      delay: 200,
      reset: true
  });
});

