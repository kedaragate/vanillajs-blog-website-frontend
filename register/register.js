const registrationForm = document.getElementById("registration-form");
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
