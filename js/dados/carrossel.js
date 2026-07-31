// Fábrica de carrossel compartilhada por "Compre Online" e "Depoimentos".
// Consolida navegação por setas, pontos e autoplay que antes existiam
// duplicados em compre-on-line.js e depoimentos.js.
const createCarousel = (config) => {
  const {
    carouselSelector,
    trackSelector,
    itemSelector,
    prevSelector,
    nextSelector,
    dotsSelector,
    perViewProperty,
    dotClass,
    activeDotClass,
    dotAriaLabel,
    interval = 4500,
  } = config;

  const carousel = carouselSelector ? document.querySelector(carouselSelector) : null;
  const track = document.querySelector(trackSelector);
  const items = document.querySelectorAll(itemSelector);
  const previousButton = prevSelector ? document.querySelector(prevSelector) : null;
  const nextButton = nextSelector ? document.querySelector(nextSelector) : null;
  const dotsContainer = dotsSelector ? document.querySelector(dotsSelector) : null;

  if (!track || items.length === 0) {
    return;
  }

  let currentIndex = 0;
  let timer = null;

  const getItemsPerView = () => {
    const parsed = Number.parseInt(getComputedStyle(track).getPropertyValue(perViewProperty), 10);
    return Number.isNaN(parsed) ? 1 : parsed;
  };

  const getMaxIndex = () => Math.max(items.length - getItemsPerView(), 0);

  const getStep = () => {
    const firstItem = items[0];

    if (!firstItem) {
      return 0;
    }

    const trackStyles = getComputedStyle(track);
    const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
    return firstItem.getBoundingClientRect().width + gap;
  };

  const updateDots = () => {
    if (!dotsContainer) {
      return;
    }

    const dots = dotsContainer.querySelectorAll(`.${dotClass}`);

    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle(activeDotClass, isActive);
      dot.toggleAttribute("aria-current", isActive);
    });
  };

  const goToSlide = (index) => {
    const maxIndex = getMaxIndex();
    currentIndex = Math.min(Math.max(index, 0), maxIndex);
    track.scrollTo({ left: getStep() * currentIndex, behavior: "smooth" });
    updateDots();
  };

  const stopAutoplay = () => {
    if (!timer) {
      return;
    }

    window.clearInterval(timer);
    timer = null;
  };

  const startAutoplay = () => {
    stopAutoplay();

    if (getMaxIndex() === 0) {
      return;
    }

    timer = window.setInterval(() => {
      const nextIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
      goToSlide(nextIndex);
    }, interval);
  };

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  const renderDots = () => {
    if (!dotsContainer) {
      return;
    }

    const slidesCount = getMaxIndex() + 1;
    dotsContainer.innerHTML = "";

    for (let index = 0; index < slidesCount; index += 1) {
      const dot = document.createElement("button");
      dot.className = dotClass;
      dot.type = "button";
      dot.dataset.slideIndex = String(index);
      dot.setAttribute("aria-label", dotAriaLabel(index));

      dot.addEventListener("click", () => {
        goToSlide(index);
        resetAutoplay();
      });

      dotsContainer.appendChild(dot);
    }

    updateDots();
  };

  renderDots();
  goToSlide(0);
  startAutoplay();

  previousButton?.addEventListener("click", () => {
    const previousIndex = currentIndex <= 0 ? getMaxIndex() : currentIndex - 1;
    goToSlide(previousIndex);
    resetAutoplay();
  });

  nextButton?.addEventListener("click", () => {
    const nextIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
    goToSlide(nextIndex);
    resetAutoplay();
  });

  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);
    // Telas de toque não disparam mouseenter/mouseleave: sem isso, o autoplay
    // nunca poderia ser pausado em mobile (WCAG 2.2.2 - Pause, Stop, Hide).
    carousel.addEventListener("touchstart", stopAutoplay, { passive: true });
  }

  window.addEventListener("resize", () => {
    const maxIndex = getMaxIndex();
    currentIndex = Math.min(currentIndex, maxIndex);
    renderDots();
    goToSlide(currentIndex);
    resetAutoplay();
  });
};
