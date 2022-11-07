export default function createHTML(item) {
  return `<div id=${item._id} class="blog-card">

      <i class="fa-solid fa-pen-to-square btn" id=blog-edit-btn title=Edit></i>
    <i class="fa-solid fa-trash btn" id=delete-btn title=Delete></i>
      <h4 class="blog-title" name="title" >${item.title}</h4>
      <h5 class="author" name="author" id=${item.author._id}>${item.author.firstName} ${item.author.lastName}</h5>
      <p class="blog-body" name="body">${item.body}</p>
    </div>`;
}
