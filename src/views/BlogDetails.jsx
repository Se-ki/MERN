import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useDocument from "../hooks/useDocument";
import { useAuthContext } from "../hooks/useAuthContext";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { author } = useAuthContext();

  const { data, isLoading, error } = useFetch({
    url: `http://localhost:3000/blogs/${id}`,
  });

  useDocument(data && data.title);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `bearer ${author.token}` },
      });
      if (!response.ok) {
        throw Error("There is a problem after you delete a blog.");
      }
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {error && <h1>{error}</h1>}
      {isLoading && <h1>Loading...</h1>}
      {!error && !isLoading && data && (
        <div className="details content">
          <h1>{data.title}</h1>
          <div className="content">
            <p>{data.body}</p>
          </div>
          <button className="delete" onClick={(e) => handleDelete(e)}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      )}
    </>
  );
};

export default BlogDetails;
