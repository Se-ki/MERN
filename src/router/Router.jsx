import {
  Route,
  Routes,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

//pages
import Blogs from "../views/Blogs";
import NewBlog from "../views/NewBlog";
import About from "../views/About";
import RootLayout from "../layout/RootLayout";
import Unknown from "../views/Unknown";
import BlogDetails from "../views/BlogDetails";

import { useAuthContext } from "../hooks/useAuthContext";
import Login from "../views/authentication/Login";
import Signup from "../views/authentication/Signup";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       <Route index element={<Blogs />} />
//       <Route path="blog/:id" element={<BlogDetails />} />
//       <Route path="about" element={<About />} />
//       <Route path="create" element={<NewBlog />} />
//       {/* <Route path="*" element={<Unknown />}>
//         <Route index />
//       </Route> */}
//     </Route>
//   )
// );

// const Router = () => {
//   return <RouterProvider router={router} />;
// };

const Router = () => {
  const { author } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={author ? <Blogs /> : <Navigate to="/login" />} />
        <Route
          path="blog/:id"
          element={author ? <BlogDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="about"
          element={author ? <About /> : <Navigate to="/login" />}
        />
        <Route
          path="create"
          element={author ? <NewBlog /> : <Navigate to="/login" />}
        />
        <Route
          path="login"
          element={!author ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="signup"
          element={!author ? <Signup /> : <Navigate to="/" />}
        />

        {/* <Route path="*" element={<Unknown />}>
         <Route index />
        </Route> */}
      </Route>
    </Routes>
  );
};

export default Router;
