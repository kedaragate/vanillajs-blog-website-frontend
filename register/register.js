const registrationForm = document.getElementById("registration-form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const error = document.getElementById("error");

confirmPassword.addEventListener("input", (e) => {
  if (password.value !== e.target.value) {
    const html = `<p id="error">Passwords did not match.</p> `;
    registrationForm.insertAdjacentHTML("afterend", html);
  }
});

function displayRadioValue() {
  var ele = document.getElementsByName("gender");

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked)
      document.getElementById("result").innerHTML = "Gender: " + ele[i].value;
  }
}

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const form = new FormData(registrationForm);
  const body = Object.fromEntries(form);
  console.log(body);
  // const url = "http://localhost:5000/api/register";
  const url = `https://node-js-app-with-auth.herokuapp.com/api/register`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
    });
});
// Navbar

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");

loginBtn.addEventListener("click", () => {
  location.href = "../login/login.html";
});
registerBtn.addEventListener("click", () => {
  location.href = "./register.html";
});
