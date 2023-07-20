import { Link } from "react-router-dom";
import useDocument from "../hooks/useDocument";

const Unknown = () => {
  useDocument("");
  return (
    <>
      <div>
        <h1>Page Not Found: Status 404</h1>
        <p>
          go back to to{" "}
          <Link to="/">
            <i>Homepage</i>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Unknown;
