import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useDocument from "../hooks/useDocument";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading, error } = useFetch({
    url: `http://localhost:3000/blogs/${id}`,
  });

  useDocument(data.title);
  const handleDelete = (e, id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3000/blogs/${id}`)
      .then(() => {
        console.log("deleted!");
        navigate("/blogs");
        // setData((prevData) => prevData.filter((blog) => blog.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && (
        <div className="details content">
          <h1>{data.title}</h1>
          <div className="content">
            <p>{data.body}</p>
          </div>
          <button className="delete" onClick={(e) => handleDelete(e, data._id)}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      )}
    </>
  );
};

export default BlogDetails;
