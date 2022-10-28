const blogTitle = document.querySelector(".blog-title");

const blogDescription = document.querySelector(".blog-description");
const body = document.getElementsByTagName("body");
const container=document.getElementById("container")


fetch("https://node-js-app-with-auth.herokuapp.com/api/blogs")
  .then((res) => res.json())
  .then((data) => {
     const result=
     data.map(ele=>createHTML(ele))
     container.insertAdjacentHTML
     
     ("afterbegin",result.join(","))
    
  })
  .catch((err) => console.log(err));

const createHTML = function (item) {
  return`<h3>${item.title}</h3>
    <h3>${item.author}</h3>
    <p>${item.body}</p>`;
    
};
