const blogTitle = document.querySelector(".blog-title");

const blogDescription = document.querySelector(".blog-description");
const body = document.getElementsByTagName("body");
const container = document.getElementById("container");
const url = "http://localhost:5000/api/blogs";
// const url = "https://node-js-app-with-auth.herokuapp.com/api/blogs";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const result = data.map((ele) => createHTML(ele));
    container.insertAdjacentHTML("afterbegin", result.join(" "));
  })
  .catch((err) => console.log(err));

const createHTML = function (item) {
  return `<div id=${item._id} class="blog-card"><h3 class="blog-title" name="title" >${item.title}</h3>
    <h4 class="author" name="author" id=${item.author._id}>${item.author.firstName} ${item.author.lastName}</h4>
    <p class="blog-body" name="body">${item.body}</p></div>`;
};
