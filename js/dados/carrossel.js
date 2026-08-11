// Fábrica de carrossel compartilhada por "Compre Online", "Depoimentos" e
// "Galeria de fotos". Consolida navegação por setas, pontos e autoplay que
// antes existiam duplicados em compre-on-line.js e depoimentos.js.
//
// Por padrão (pagedNavigation: false), cada clique/autoplay avança 1 item por
// vez (comportamento original). Com pagedNavigation: true, cada clique/dot
// avança uma "página" inteira (--Xxx-per-view itens de uma vez) — usado na
// galeria de fotos, onde o acervo é pequeno e avançar 1 a 1 repete fotos.
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
    pagedNavigation = false,
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

  // Em modo paginado, cada "pagina" comeca em um multiplo de itens-por-view
  // (a ultima pagina e ajustada para nao passar do fim). Em modo normal,
  // pagina == indice do item, mantendo o comportamento original.
  const getPageCount = () => {
    if (!pagedNavigation) {
      return getMaxIndex() + 1;
    }
    return Math.max(Math.ceil(items.length / getItemsPerView()), 1);
  };

  const getPageStartIndex = (pageIndex) => {
    if (!pagedNavigation) {
      return pageIndex;
    }
    return Math.min(pageIndex * getItemsPerView(), getMaxIndex());
  };

  const getCurrentPage = () => {
    if (!pagedNavigation) {
      return currentIndex;
    }
    return Math.min(Math.round(currentIndex / getItemsPerView()), getPageCount() - 1);
  };

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
    const activePage = getCurrentPage();

    dots.forEach((dot, index) => {
      const isActive = index === activePage;
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

  const goToPage = (pageIndex) => {
    const pageCount = getPageCount();
    const clampedPage = Math.min(Math.max(pageIndex, 0), pageCount - 1);
    goToSlide(getPageStartIndex(clampedPage));
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
      const currentPage = getCurrentPage();
      goToPage(currentPage >= getPageCount() - 1 ? 0 : currentPage + 1);
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

    const pageCount = getPageCount();
    dotsContainer.innerHTML = "";

    for (let index = 0; index < pageCount; index += 1) {
      const dot = document.createElement("button");
      dot.className = dotClass;
      dot.type = "button";
      dot.dataset.slideIndex = String(index);
      dot.setAttribute("aria-label", dotAriaLabel(index));

      dot.addEventListener("click", () => {
        goToPage(index);
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
    const currentPage = getCurrentPage();
    goToPage(currentPage <= 0 ? getPageCount() - 1 : currentPage - 1);
    resetAutoplay();
  });

  nextButton?.addEventListener("click", () => {
    const currentPage = getCurrentPage();
    goToPage(currentPage >= getPageCount() - 1 ? 0 : currentPage + 1);
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
