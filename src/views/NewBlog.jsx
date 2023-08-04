import { useState } from "react";
import useDocument from "../hooks/useDocument";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const NewBlog = () => {
  useDocument("Create");

  const navigate = useNavigate();
  const { author } = useAuthContext();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState({
    title: null,
    snippet: null,
    body: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = state.title;
    const snippet = state.snippet;
    const body = state.body;
    const blog = { title, snippet, body };

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/blogs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${author.token}`,
        },
        body: JSON.stringify(blog),
      });
      const json = await response.json();
      if (!response.ok) {
        setLoading(false);
        setError(json.error);
        return;
      }
      setState({ ...state, title: null, snippet: null, body: null });
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className="create-blog content">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="title">Blog Title:</label>
          <input
            type="text"
            defaultValue={state.title}
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
            defaultValue={state.snippet}
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
            defaultValue={state.body}
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
