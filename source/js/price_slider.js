const table = document.querySelector(".price-list");
const buttonLeft = document.querySelector(".slide-one");
const buttonMid = document.querySelector(".slide-two");
const buttonRight = document.querySelector(".slide-three");


buttonLeft.onclick = function (){
  table.classList.add("price-list--left");
  table.classList.remove("price-list--right");
  buttonLeft.classList.add("slider__toggle--current");
  buttonMid.classList.remove("slider__toggle--current");
  buttonRight.classList.remove("slider__toggle--current");
};


buttonMid.onclick = function(){
  table.classList.remove("price-list--left");
  table.classList.remove("price-list--right");
  buttonMid.classList.add("slider__toggle--current");
  buttonLeft.classList.remove("slider__toggle--current");
  buttonRight.classList.remove("slider__toggle--current");
};

buttonRight.onclick = function(){
  table.classList.add ("price-list--right");
  table.classList.remove("price-list--left");
  buttonRight.classList.add("slider__toggle--current");
  buttonLeft.classList.remove("slider__toggle--current");
  buttonMid.classList.remove("slider__toggle--current");
};

buttonMid += buttonMid.classList.add("slider__toggle--current");
