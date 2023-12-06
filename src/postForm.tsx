export default function PostForm() {
  function formSubmitHandler(event: any) {
    event.preventDefault();
    // You can access form values using event.target
    const title = event.target.title.value; // Get the value of the input with id="title"
    console.log("form", title);

    const payload = {
      title: title,
    };
    savePosts(payload);
    event.target.reset(); //reset input
  }

  async function savePosts(formdata: { title: string }) {
    const GET_POST_API_URL = "http://localhost:4200/api/posts";
    fetch(GET_POST_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
      body: JSON.stringify(formdata), // Convert data to JSON string
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        console.log("POST request succeeded with JSON response:", data);
        // Do something with the response data
        alert(data.message);
        // refresh page to fetch all post
      })
      .catch((error) => {
        console.error("There was a problem with the POST request:", error);
      });
  }

  return (
    <section className="form-container">
      <form className="post-form" onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="title" className="label">
            Title
          </label>
          <input id="title" type="text" className="input" />
        </div>
        <button type="submit" className="button">
          Post
        </button>
      </form>
    </section>
  );
}
