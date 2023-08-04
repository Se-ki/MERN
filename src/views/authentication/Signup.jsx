import { useState } from "react";
import useDocument from "../../hooks/useDocument";
import spinner from "../../assets/loading.gif";

const Signup = () => {
  useDocument("Signup");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fullname = state.fullname;
    const email = state.email;
    const password = state.password;
    const author_info = { fullname, email, password };
    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(author_info),
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        setLoading(false);
        return;
      }

      setState({
        fullname: "",
        email: "",
        password: "",
      });
      setLoading(false);
      setError(json.msg);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="create-blog content">
      <form onSubmit={(e) => handleSubmit(e)}>
        {error && <i>{error}</i>}
        <label>Fullname: </label>
        <input
          type="text"
          value={state.fullname}
          onChange={(e) => setState({ ...state, fullname: e.target.value })}
          autoFocus
          required
        />
        <label>Email: </label>
        <input
          type="email"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          required
        />
        <label>Password: </label>
        <input
          type="password"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
          required
        />
        {!loading && <button>Create</button>}
        {loading && (
          <button>
            <img src={spinner} width="19px" alt="loading..." />
          </button>
        )}
      </form>
    </div>
  );
};

export default Signup;
