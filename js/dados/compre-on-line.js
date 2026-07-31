const onlineProductCards = document.querySelectorAll(".online-product-card");
const onlineProductButtons = document.querySelectorAll(".online-product-card__button[data-target]");
const productZoomScale = 3.35;

const setProductZoomPosition = (card, media, image, clientX, clientY) => {
  const rect = media.getBoundingClientRect();
  const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
  const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  card.style.setProperty("--zoom-x", `${xPercent}%`);
  card.style.setProperty("--zoom-y", `${yPercent}%`);
  card.style.setProperty("--zoom-bg-x", `${xPercent}%`);
  card.style.setProperty("--zoom-bg-y", `${yPercent}%`);
  card.style.setProperty("--zoom-bg-size", `${rect.width * productZoomScale}px auto`);
  card.style.setProperty("--zoom-image", `url("${image.currentSrc || image.src}")`);
};

const toggleProductZoom = (card, isActive) => {
  card.classList.toggle("online-product-card--zoom-active", isActive);
};

onlineProductCards.forEach((card) => {
  const media = card.querySelector(".online-product-card__media");
  const image = card.querySelector(".online-product-card__image");

  if (!media || !image) {
    return;
  }

  media.addEventListener("mouseenter", (event) => {
    setProductZoomPosition(card, media, image, event.clientX, event.clientY);
    toggleProductZoom(card, true);
  });

  media.addEventListener("mousemove", (event) => {
    setProductZoomPosition(card, media, image, event.clientX, event.clientY);
  });

  media.addEventListener("mouseleave", () => {
    toggleProductZoom(card, false);
  });

  card.addEventListener("focusin", () => {
    const rect = media.getBoundingClientRect();
    setProductZoomPosition(card, media, image, rect.left + rect.width / 2, rect.top + rect.height / 2);
    toggleProductZoom(card, true);
  });

  card.addEventListener("focusout", () => {
    toggleProductZoom(card, false);
  });
});

onlineProductButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetSelector = button.dataset.target;
    const target = targetSelector ? document.querySelector(targetSelector) : null;

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

createCarousel({
  carouselSelector: ".online-shop-section__carousel",
  trackSelector: ".online-shop-section__grid",
  itemSelector: ".online-product-card",
  prevSelector: ".online-shop-section__arrow--previous",
  nextSelector: ".online-shop-section__arrow--next",
  dotsSelector: ".online-shop-section__dots",
  perViewProperty: "--cards-per-view",
  dotClass: "online-shop-section__dot",
  activeDotClass: "online-shop-section__dot--active",
  dotAriaLabel: (index) => `Mostrar grupo de produtos ${index + 1}`,
  interval: 4500,
});
