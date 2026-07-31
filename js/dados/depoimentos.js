createCarousel({
  carouselSelector: ".testimonials-section__carousel",
  trackSelector: ".testimonials-section__cards",
  itemSelector: ".testimonial-card",
  prevSelector: ".testimonials-section__arrow--previous",
  nextSelector: ".testimonials-section__arrow--next",
  dotsSelector: ".testimonials-section__dots",
  perViewProperty: "--testimonials-per-view",
  dotClass: "testimonials-section__dot",
  activeDotClass: "testimonials-section__dot--active",
  dotAriaLabel: (index) => `Mostrar depoimento ${index + 1}`,
  interval: 4500,
});
