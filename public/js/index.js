import { login } from "./login";

const loginForm = document.querySelector(".form-login");
const search = document.getElementById("search");

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });

if (search)
  search.addEventListener("keyup", (e) => {
    console.log(e.target.value);
    const url = new URL(location.href);

    console.log(url);
    url.searchParams.set("nameStartsWith", e.target.value);
    history.replaceState(null, "", url);

    if (e.keyCode === 13) history.go();
  });
