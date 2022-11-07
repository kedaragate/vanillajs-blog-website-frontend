const blog = document.getElementById("blog-form");

const author = document.getElementById("author");
const user = JSON.parse(sessionStorage.getItem("user"));
const accessToken = sessionStorage.getItem("accessToken");

const blogEditContainer = document.getElementById("blog-edit-container");

import createHTML from "./createHTML.js";
import deleteBlog from "./deleteBlog.js";
import editBlogHTML from "./editBlogHTML.js";
import putRequest from "./putRequest.js";

console.log(editBlogHTML);

blogEditContainer.classList.add("hidden");
if (!accessToken) {
  location.href = "../login/login.html";
  // navbarbuttonContainer.appendChild(loginAndRegisterContainer);
  // console.log(navbarbuttonContainer);
}

author.value = user.id;

blog.addEventListener("submit", (e) => {
  const form = new FormData(blog);

  const body = Object.fromEntries(form);

  const accessToken = `JWT ${sessionStorage.getItem("accessToken")}`;
  const postUrl = "https://node-js-app-with-auth.herokuapp.com/api/blogs";
  // const postUrl = "http://localhost:5000/api/blogs";
  fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => console.log(data.author))
    .catch((err) => {
      console.log(err);
    });
});

const userBlogsContainer = document.getElementById("user-blogs-container");

// const getUrl = "http://localhost:5000/api/blogs";
const getUrl = "https://node-js-app-with-auth.herokuapp.com/api/blogs";
const currentUserId = JSON.parse(sessionStorage.getItem("user")).id;
const getBlogData = async () => {
  const response = await fetch(getUrl);
  const data = await response.json();

  return data;
};
const usersBlogs = getBlogData();
usersBlogs.then((data) => {
  const result = data.filter((ele) => {
    return ele.author._id == currentUserId;
  });

  sessionStorage.setItem("usersBlogs", JSON.stringify(result));
  const htmlElement = result.map((ele) => {
    return createHTML(ele);
  });

  userBlogsContainer.insertAdjacentHTML("beforeend", htmlElement.join(" "));
});

userBlogsContainer.addEventListener("click", (e) => {
  e.preventDefault();

  const blogCardId = e.target.parentElement.id;
  console.log(blogCardId);
  const blogs = JSON.parse(sessionStorage.getItem("usersBlogs"));
  console.log(blogs);
  const blogToEdit = blogs.filter((blogItem) => {
    console.log(blogItem._id, blogCardId);
    return blogItem._id === blogCardId;
  });

  const blogEditContainer = document.getElementById("blog-edit-container");
  blogEditContainer.innerHTML = null;
  blogEditContainer.insertAdjacentHTML("afterbegin", editBlogHTML(blogToEdit));
  const editedBlogTitle = document.getElementById("edit-blog-title");
  const editedBlogBody = document.getElementById("edit-blog-body");
  console.log(blogToEdit);
  editedBlogTitle.value = blogToEdit[0].title;
  editedBlogBody.innerText = blogToEdit[0].body;

  editedBlogTitle.addEventListener("keyup", (e) => {
    editedBlogTitle.value = e.target.value;
  });

  editedBlogBody.addEventListener("keyup", (e) => {
    editedBlogBody.innerText = e.target.value;
  });
  const blogEditButton = document.getElementById("blog-edit-btn");
  console.log(blogEditButton);
  blogEditButton.addEventListener("click", () => {
    console.log("blogEditButton clicked");
    blogEditContainer.style.visibility = "visible";
  });
  const editedBlogHtmlForm = document.getElementById("edited-blog");

  // Edit user Blog
  editedBlogHtmlForm.addEventListener("submit", (e) => {
    // e.preventDefault();
    const form = new FormData(editedBlogHtmlForm);
    const body = Object.fromEntries(form);
    console.log(body);
    if (e.target === editedBlogHtmlForm) {
      putRequest(blogCardId, body);
    }
  });
});

// Delete user blog

userBlogsContainer.addEventListener("click", (e) => {
  e.preventDefault();

  const deleteBlogButton = document.getElementById("delete-btn");

  if (e.target === deleteBlogButton) {
    deleteBlog(e);
  } else {
    console.log("delete button not clicked");
  }
});

// Navbar

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");

loginBtn.addEventListener("click", () => {
  location.href = "../login/login.html";
});
registerBtn.addEventListener("click", () => {
  location.href = "../register/register.html";
});
