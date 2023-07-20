import { NavLink, Outlet, Link } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <nav>
        <div className="site-title">
          <header>
            <Link>
              <h1>Blog World</h1>
            </Link>
            <p>blog for all people in the world site</p>
          </header>
        </div>
        <ul>
          <li>
            <NavLink to="/blogs">Blogs</NavLink>
          </li>
          <li>
            <NavLink to="about">About</NavLink>
          </li>
          <li>
            <NavLink to="create">Create Blogs</NavLink>
          </li>
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
