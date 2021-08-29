import { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { login, signup } from "../utils/networkHandler";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [whatKind, setWhatKind] = useState("");
  const [message, setMessage] = useState({ type: "", message: "" });
  const history = useHistory();

  useEffect(() => {
    setFormData({
      email: "",
      password: "",
    });
    setWhatKind(props.location.pathname);
    setMessage({ type: "", message: "" });
  }, [props.location.pathname]);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    if (validateEmail(formData.email)) {
      setMessage({ type: "", message: "" });
      if (formData.password.length > 0) {
        setMessage({ type: "", message: "" });
        if (whatKind === "/login") {
          setMessage({ type: "green", message: "Loading...." });
          let res = await login(formData);
          setMessage({
            type: res.loggedIn ? "green" : "red",
            message: res.message,
          });
          if (res.loggedIn) {
            props.toggleLoggedIn();
            history.push("/urlshortner");
          }
        } else {
          setMessage({ type: "green", message: "Loading...." });
          let res = await signup(formData);
          setMessage({
            type: res.signup ? "green" : "red",
            message: res.message,
          });
        }
      } else {
        setMessage({ type: "red", message: "Enter password" });
      }
    } else {
      setMessage({ type: "red", message: "Invalid Email address" });
    }
  };

  return (
    <section>
      <div className="form-container">
        {!props.isLogged && (
          <div>
            <h1>{whatKind === "/login" ? "Login" : "Sign up"}</h1>
            <div className="control">
              <input
                type="email"
                id="floatingInput"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="control">
              <input
                type="password"
                id="floatingPassword"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <p style={{ color: message.type }}>{message.message}</p>
            <div className="control">
              <input
                type="submit"
                onClick={handleSubmit}
                value={whatKind === "/login" ? "Login" : "Sign up"}
              />
            </div>
            <div className="link">
              <Link className="a" to="/forgot-password">
                Forgot password?
              </Link>
              {whatKind === "/login" ? (
                <Link className="a" to="/signup">
                  Create an account
                </Link>
              ) : (
                <Link className="a" to="/login">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
        {props.isLogged && <Redirect to="/urlshortner" />}
      </div>
    </section>
  );
};

export default Login;
