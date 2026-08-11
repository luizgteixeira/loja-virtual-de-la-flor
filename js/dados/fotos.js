createCarousel({
  carouselSelector: ".photos-section__carousel",
  trackSelector: ".photos-section__grid",
  itemSelector: ".photos-section__item",
  prevSelector: ".photos-section__arrow--previous",
  nextSelector: ".photos-section__arrow--next",
  dotsSelector: ".photos-section__dots",
  perViewProperty: "--photos-per-view",
  dotClass: "photos-section__dot",
  activeDotClass: "photos-section__dot--active",
  dotAriaLabel: (index) => `Mostrar grupo de fotos ${index + 1}`,
  interval: 5000,
  pagedNavigation: true,
});
