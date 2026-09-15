createCarousel({
  carouselSelector: ".trust-section__carousel",
  trackSelector: ".trust-section__grid",
  itemSelector: ".trust-section__item",
  prevSelector: ".trust-section__arrow--previous",
  nextSelector: ".trust-section__arrow--next",
  dotsSelector: ".trust-section__dots",
  perViewProperty: "--trust-per-view",
  dotClass: "trust-section__dot",
  activeDotClass: "trust-section__dot--active",
  dotAriaLabel: (index) => `Mostrar slide ${index + 1}`,
  interval: 6000,
});
