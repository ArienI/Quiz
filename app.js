const swiperThumb = new Swiper('.gift__swiper--thumb', {
  spaceBetween: 16,
  slidesPerView: 6,
  freeMode: true,
});

const swiperMAin = new Swiper('.gift__swiper--card', {
  spaceBetween: 16,
  thumbs: {
    swiper: swiperThumb,
  }
});