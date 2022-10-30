const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const form = new FormData(loginForm);
  const body = Object.fromEntries(form);
  const url = "http://localhost:5000/api/login";
  // const url = `https://node-js-app-with-auth.herokuapp.com/api/login`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.accessToken) {
        console.log(data);
        location.href = "../userblogs/userblogs.html";

        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      } else {
        console.log(data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
