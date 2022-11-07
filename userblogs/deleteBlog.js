export default function deleteBlog(e) {
  location.reload();
  const blogCardId = e.target.parentElement.id;
  const accessToken = `JWT ${sessionStorage.getItem("accessToken")}`;
  const url = `https://node-js-app-with-auth.herokuapp.com/api/blogs/${blogCardId}`;
  //   const url = `http://localhost:5000/api/blogs/${blogCardId}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
    });
}
