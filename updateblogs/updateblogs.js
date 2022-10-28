blog = document.getElementById("blog-form");

blog.addEventListener("submit", (e) => {
  e.preventDefault();

  const form = new FormData(blog);
  const body = Object.fromEntries(form);
  console.log(body);
  const accessToken = `JWT ${sessionStorage.getItem("accessToken")}`;

  fetch(`https://node-js-app-with-auth.herokuapp.com/api/blogs`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
    });
});
