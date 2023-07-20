import { useEffect, useState } from "react";
import useDocument from "../hooks/useDocument";

const About = () => {
  const [data, setData] = useState([]);
  useDocument("About");
  return (
    <>
      <div className="about content">
        <h1>About</h1>
        <p>Jee Ann Guinsod</p>
        <p>Christian Kyle Autor</p>
        <p>Eufee Guinsod</p>
        <p>Ferdilyn Guinsod</p>
      </div>
    </>
  );
};

export default About;
