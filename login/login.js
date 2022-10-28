const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(loginForm);
  const body = Object.fromEntries(form);
  fetch(`https://node-js-app-with-auth.herokuapp.com/api/login`, {
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
        // setTimeout((location.href = "../writeblogs/writeblogs.html"), 10000);

        sessionStorage.setItem("accessToken", data.accessToken);
      } else {
        console.log(data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
