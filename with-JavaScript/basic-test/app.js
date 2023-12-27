const loginform = document.querySelector(".login-form");
const loginInput = loginform.querySelector("input");
const loginButton = loginform.querySelector("button");
const loginH1 = document.querySelector("h1");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
// if (localStorage.getItem("username") !== null) {
//   loginform.classList.add("hidden");
//   loginH1.classList.remove("hidden");
//   loginH1.innerText = `Hello ${localStorage.getItem("username")} !`;
// }
if (localStorage.getItem(USERNAME_KEY) === null) {
  loginform.classList.remove(HIDDEN_CLASSNAME);
  loginH1.classList.add(HIDDEN_CLASSNAME);
} else {
  switchFormH1();
}
// else {
//   onLoginSubmit;
// }
function switchFormH1() {
  loginform.classList.add(HIDDEN_CLASSNAME);
  loginH1.innerText = `Hello ! ${localStorage.getItem(USERNAME_KEY)} !`;
  loginH1.classList.remove(HIDDEN_CLASSNAME);
}

function onLoginSubmit(event) {
  const username = loginInput.value;
  event.preventDefault();
  localStorage.setItem(USERNAME_KEY, username);
  switchFormH1();
  // loginH1.querySelector("div:nth-child(2)").innerText = ` ${username} !`;
}

loginform.addEventListener("submit", onLoginSubmit);
