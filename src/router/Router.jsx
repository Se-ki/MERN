import {
  Route,
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/blogs" element={<RootLayout />}>
      <Route index element={<Blogs />} />
      <Route path=":id" element={<BlogDetails />} />
      <Route path="about" element={<About />} />
      <Route path="create" element={<NewBlog />} />
      <Route path="*" element={<Unknown />}>
        <Route index />
      </Route>
    </Route>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
