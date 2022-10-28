const blogTitle = document.querySelector(".blog-title");

const blogDescription = document.querySelector(".blog-description");
const body = document.getElementsByTagName("body");
console.log(body);

fetch("https://node-js-app-with-auth.herokuapp.com/api/blogs")
  .then((res) => res.json())
  .then((data) => createHTML(data))
  .catch((err) => console.log(err));

const createHTML = function (data) {
  const items = data.map((item) => {
    return `<h3>${item.title}</h3>
    <h3>${item.author}</h3>
    <p>${item.body}</p>`;
  });

  items.map((element) => {
    body.insertAdjacentHTML("afterend", element);
  });
};
