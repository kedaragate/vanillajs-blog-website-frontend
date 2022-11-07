const editBlogHTML = function (data) {
  return `<form type=submit id=edited-blog >
<input
type="text"

name="title"
id="edit-blog-title"

/><br />

<input
type="text"
placeholder="Author"
name="author"
id="author"
hidden
value=${data.id}
/>
<textarea
name="body"
id="edit-blog-body"


></textarea>
<button type="submit" id="submit-edited-blog-btn">Submit</button>
</form>`;
};

export default editBlogHTML;
