import { Link } from "react-router-dom";

const BlogList = ({ data, error, isLoading }) => {
  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <div className="blogs content">
          {data &&
            data.map((blog) => (
              <div className="content" key={blog._id}>
                <Link className="single" to={`blog/${blog._id}`}>
                  <h3 className="title">{blog.title}</h3>
                  {/* put a author to determine the writer of that blog */}
                  <p className="snippet">{blog.snippet}</p>
                </Link>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default BlogList;
