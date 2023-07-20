import { useState } from "react";
import useDocument from "../hooks/useDocument";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
  useDocument("Create");

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [state, setState] = useState({
    title: "",
    snippet: "",
    body: "",
  });

  const handleSubmit = (e) => {
    console.log("clicked!");
    e.preventDefault();

    const title = state.title;
    const snippet = state.snippet;
    const body = state.body;
    const blog = { title, snippet, body };

    setLoading(true);

    fetch("http://localhost:3000/blogs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => {
        setLoading(false);
        setState({
          ...state,
          title: "",
          snippet: "",
          body: "",
        });
        console.log("data send!");
        console.log(res);
        navigate("/blogs");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className="create-blog content">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="title">Blog Title:</label>
          <input
            type="text"
            value={state.title}
            onChange={(e) => {
              const title = e.target.value;
              setState({
                ...state,
                title: title,
              });
            }}
            autoFocus
            required
          />
          <label htmlFor="snippet">Blog Snippet: </label>
          <input
            type="text"
            value={state.snippet}
            onChange={(e) => {
              const snippet = e.target.value;
              setState({
                ...state,
                snippet: snippet,
              });
            }}
            required
          />
          <label htmlFor="body">Blog Body: </label>
          <textarea
            value={state.body}
            onChange={(e) => {
              const body = e.target.value;
              setState({
                ...state,
                body: body,
              });
            }}
            required
          ></textarea>
          {isLoading && <button>Adding...</button>}
          {!isLoading && <button>Submit</button>}
        </form>
      </div>
    </>
  );
};

export default NewBlog;
