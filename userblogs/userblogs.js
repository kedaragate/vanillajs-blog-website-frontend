const blog = document.getElementById("blog-form");
const blogTitle = document.getElementById("blog-title");
const blogBody = document.getElementById("blog-body");
const author = document.getElementById("author");
const user = JSON.parse(sessionStorage.getItem("user"));

author.value = user.id;
blog.addEventListener("submit", (e) => {
  e.preventDefault();

  const form = new FormData(blog);

  const body = Object.fromEntries(form);
  console.log(body);
  const accessToken = `JWT ${sessionStorage.getItem("accessToken")}`;
  // const url=`https://node-js-app-with-auth.herokuapp.com/api/blogs`;
  const url = "http://localhost:5000/api/blogs";
  fetch(url, {
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

const container = document.getElementById("container");
const url = "http://localhost:5000/api/blogs";
// const url = "https://node-js-app-with-auth.herokuapp.com/api/blogs";

const currentUserId = JSON.parse(sessionStorage.getItem("user")).id;
const getBlogData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
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

  container.insertAdjacentHTML("afterbegin", htmlElement.join(" "));
});

const blogEditButton = document.getElementsByClassName("blog-edit-btn");

container.addEventListener("click", (e) => {
  e.preventDefault();
  const blogCardId = e.target.parentElement.id;
  const blogs = JSON.parse(sessionStorage.getItem("usersBlogs"));
  console.log(blogs);

  const blogToEdit = blogs.filter((blogItem) => {
    return blogItem._id == blogCardId;
  });
  console.log(blogToEdit);

  const editBlogForm = `<form type=submit id=edited-blog>
  <input
  type="text"
placeholder=${blogToEdit[0].title}
  name="title"
  id="edit-blog-title"

/><br />

<input
  type="text"
  placeholder="Author"
  name="author"
  id="author"
  hidden
  value=${user.id}
/>
<textarea
  name="body"
  id="edit-blog-body"
  placeholder=${blogToEdit[0].body}

></textarea>
<button type="submit" id="submit-edited-blog-btn">Submit</button>
  </form>`;

  const blogEditContainer = document.getElementById("blog-edit-container");

  blogEditContainer.insertAdjacentHTML("afterbegin", editBlogForm);
  const editedBlogTitle = document.getElementById("edit-blog-title");
  const editedBlogBody = document.getElementById("edit-blog-body");
  editedBlogTitle.value = blogToEdit[0].title;
  editedBlogBody.innerText = blogToEdit[0].body;
  console.log(editedBlogTitle);
  console.log(editedBlogBody);

  editedBlogTitle.addEventListener("keyup", (e) => {
    editedBlogTitle.value = e.target.value;
    console.log(editedBlogTitle.value);
  });

  editedBlogBody.addEventListener("keyup", (e) => {
    editedBlogBody.innerText = e.target.value;
    console.log(editedBlogBody);
  });

  const editedBlogHtmlForm = document.getElementById("edited-blog");

  editedBlogHtmlForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const form = new FormData(editedBlogHtmlForm);

    const body = Object.fromEntries(form);
    console.log(body);
    const accessToken = `JWT ${sessionStorage.getItem("accessToken")}`;
    // const url=`https://node-js-app-with-auth.herokuapp.com/api/blogs`;
    const url = `http://localhost:5000/api/blogs/${blogCardId}`;
    fetch(url, {
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
});

const createHTML = function (item) {
  return `<div id=${item._id} class="blog-card"><h3 class="blog-title" name="title" >${item.title}</h3>
    <h4 class="author" name="author" id=${item.author._id}>${item.author.firstName} ${item.author.lastName}</h4>
    <p class="blog-body" name="body">${item.body}</p>
    <button type="submit" class=blog-edit-btn>Edit</button>
    <button type="submit" class=blog-delete-btn>Delete</button></div>`;
};