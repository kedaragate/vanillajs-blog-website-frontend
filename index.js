const blogTitle = document.querySelector(".blog-title");

const blogDescription = document.querySelector(".blog-description");
const body = document.getElementsByTagName("body");
console.log(body);

fetch("https://node-js-app-with-auth.herokuapp.com/api/blogs")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      createHTML(element);
      console.log(element);
    });
  })
  .catch((err) => console.log(err));

const createHTML = function (data) {
  const items = data.map((item) => {
    return `<h3>${item.title}</h3>
    <h3>${item.author}</h3>
    <p>${item.body}</p>`;
  });
  items.map((ele) => {
    body.appendChild(ele);
  });
};
