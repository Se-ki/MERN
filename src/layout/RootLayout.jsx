import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { drop } from "lodash";

const RootLayout = () => {
  const { author, dispatch } = useAuthContext();

  //show dropdown
  const dropdown = (e) => {
    document.getElementById("myDropdown").classList.toggle("show");
  };

  //hide dropdown
  if (!dropdown) {
    window.onclick = (e) => {
      if (!e.target.matches(".dropbtn")) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains("show")) {
          myDropdown.classList.remove("show");
        }
      }
    };
  }

  const handleClick = () => {
    Cookies.remove("jwt", {
      sameSite: "strict",
    });
    dispatch({ type: "LOGOUT" });
  };
  return (
    <>
      <nav>
        <div className="site-title">
          <header>
            <Link to="/">
              <h1>Blog World</h1>
              <p>Discover a world of stories, ideas, and inspiration </p>
              <p>through our captivating blog app.</p>
            </Link>
          </header>
        </div>

        <ul>
          {!author && (
            <>
              <li>
                <NavLink to="login">Login</NavLink>
              </li>
              <li>
                <NavLink
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "7px solid red",
                    borderRadius: "15px",
                  }}
                  to="signup"
                >
                  Create Account
                </NavLink>
              </li>
            </>
          )}
          {author && (
            <>
              <li>
                <NavLink to="/">Blogs</NavLink>
              </li>
              <li>
                <NavLink to="about">About</NavLink>
              </li>
              <li>
                <NavLink to="create">Create Blogs</NavLink>
              </li>
              <li className="dropdown">
                <button className="dropbtn" onClick={(e) => dropdown(e)}>
                  {author.fullname}
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content" id="myDropdown">
                  <a onClick={handleClick}>Logout</a>
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>Copyright &copy; Christian Kyle Autor </footer>
    </>
  );
};

export default RootLayout;
