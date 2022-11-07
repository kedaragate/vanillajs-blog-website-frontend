const blogTitle = document.getElementsByClassName("blog-title");

const blogDescription = document.getElementsByClassName("blog-body");
const body = document.getElementsByTagName("body");
const container = document.getElementById("container");
const url = "http://localhost:5000/api/blogs";
// const url = "https://node-js-app-with-auth.herokuapp.com/api/blogs";

async function getAllBlogs() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
}
const allBlogs = getAllBlogs();

allBlogs.then((data) => {
  console.log(data);
  const result = data.map((ele) => createHTML(ele));
  container.insertAdjacentHTML("afterbegin", result.join(" "));
});

const createHTML = function (item) {
  return `<div id=${item._id} class="blog-card"><h3 class="blog-title" name="title" >${item.title}</h3><button id="blog-speech">Listen Audio</button>
    <h4 class="author" name="author" id=${item.author._id}>${item.author.firstName} ${item.author.lastName}</h4>
    <p class="blog-body" name="body">${item.body}
     </p></div>`;
};

if ("speechSynthesis" in window) {
  console.log("Speech Synthesis is supported 🎉");
} else {
  console.log("speech Synthesis is not Supported 😞");
}

// allBlogs.then((data) => {
//   console.log(data);
//   let utterance = new SpeechSynthesisUtterance(data[0].body);
//   console.log(utterance);
//   // speechSynthesis.speak(utterance);
// });

const readMoreText = document.getElementsByClassName("readmore");

// Navbar

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");

loginBtn.addEventListener("click", () => {
  // const url = window.history.replaceState("", "Login", "./login/login.html");
  location.href = "./login/login.html";
  // window.history.replaceState("", "Login", "./login.html");
  // window.location(url);
});
// registerBtn.addEventListener("click", () => {
//   location.href = "./register/register.html";
// });

// console.log(window.history);
