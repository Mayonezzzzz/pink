const failure = document.querySelector(".failure");
const success = document.querySelector(".success");
const failButton = failure.querySelector(".failure__button");
const successButton = success.querySelector(".success__button");
const form = document.querySelector(".main__form");
const submit = form.querySelector(".submit__button");
const name = form.querySelector("[name=name]");
const surname = form.querySelector("[name=surname]");
const post = form.querySelector("[name=email]");

form.onsubmit = function(evt){
  if (!name.value || !surname.value || !post.value) {
    evt.preventDefault();
    failure.classList.remove("no-failure");
  } else {
    success.classList.remove("no-success");
    evt.preventDefault();
  };
};

successButton.onclick = function() {
  success.classList.add("no-success");
};

failButton.onclick = function() {
  failure.classList.add("no-failure");
  surname.focus();
};
