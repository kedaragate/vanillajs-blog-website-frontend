export default function putRequest(blogCardId, body) {
  const accessToken = `JWT ${sessionStorage.getItem("accessToken")}`;
  // const url = `https://node-js-app-with-auth.herokuapp.com/api/blogs/${blogCardId}`;
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
}
