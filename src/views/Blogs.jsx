import useDocument from "../hooks/useDocument";
import useFetch from "../hooks/useFetch";
import BlogList from "./BlogList";

const Blogs = () => {
  useDocument();

  const { data, isLoading, error } = useFetch({
    url: "http://localhost:3000/blogs",
  });

  return (
    <div className="details content">
      <BlogList data={data} error={error} isLoading={isLoading} />
    </div>
  );
};

export default Blogs;
