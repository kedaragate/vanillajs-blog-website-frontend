const blogTitle = document.querySelector(".blog-title");

const blogDescription = document.querySelector(".blog-description");
const body = document.getElementsByTagName("body");
const container=document.querySelector(".container")
console.log(container)

fetch("https://node-js-app-with-auth.herokuapp.com/api/blogs")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    console.log(container)
    data.forEach((element) => {
      return createHTML(element);
      
     
    });
  })
  .catch((err) => console.log(err));

const createHTML = function (item) {
  const e=`<h3>${item.title}</h3>
    <h3>${item.author}</h3>
    <p>${item.body}</p>`;
    return container.insertAdjacentHTML("beforebegin",e)
};
