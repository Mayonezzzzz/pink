const siteMenu = document.querySelector(".main-nav");
const menuBlock = document.querySelector(".menu-block");
const buttonMenu = document.querySelector(".page-header__toggle");
const pageHeader = document.querySelector(".page-header");

pageHeader.classList.remove("page-header--nojs");
menuBlock.classList.remove("menu-block--nojs");
siteMenu.classList.add("main-nav--closed");

buttonMenu.addEventListener('click', function(){
  if (siteMenu.classList.contains("main-nav--closed")) {
    siteMenu.classList.remove("main-nav--closed");
    siteMenu.classList.add("main-nav--opened");
    menuBlock.classList.add("menu-block--click");
    buttonMenu.classList.remove("page-header__toggle--closed");
    buttonMenu.classList.add("page-header__toggle--opened");
  } else {
    siteMenu.classList.add("main-nav--closed");
    siteMenu.classList.remove("main-nav--opened");
    menuBlock.classList.remove("menu-block--click");
    buttonMenu.classList.remove("page-header__toggle--opened");
    buttonMenu.classList.add("page-header__toggle--closed");
  }
});
