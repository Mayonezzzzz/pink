/*этот скрипт я нагло спер с какого - то сайта, сам его не писал*/
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("reviews-slider__item");
  var dots = document.getElementsByClassName("reviews-slider__toggle");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" slider__toggle--current", "");
  }
  slides[slideIndex-1].style.display = "flex";
  dots[slideIndex-1].className += " slider__toggle--current";
}
