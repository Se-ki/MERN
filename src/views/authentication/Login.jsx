import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Cookies from "js-cookie";
import useDocument from "../../hooks/useDocument";
const Login = () => {
  useDocument("Login");
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = state.email;
    const password = state.password;
    const author_info = { email, password };

    const response = await fetch("http://localhost:3000/user/login  ", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(author_info),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      return;
    }
    setError(null);
    Cookies.set("jwt", JSON.stringify(json), {
      expires: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      domain: "localhost",
    });
    dispatch({ type: "LOGIN", payload: json });
  };

  return (
    <div className="create-blog content">
      <form onSubmit={(e) => handleSubmit(e)}>
        {error && <i className="error">{error}</i>}
        <label>Email: </label>
        <input
          type="email"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          required
          autoFocus
        />
        <label>Password: </label>
        <input
          type="password"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
          required
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
