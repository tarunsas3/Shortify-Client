import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../utils/networkHandler";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: "", message: "" });

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    setMessage({ type: "green", message: "Loading...." });
    if (validateEmail(email)) {
      let res = await forgotPassword(email);
      setMessage({
        type: res.mailSent ? "green" : "red",
        message: res.message,
      });
    } else {
      setMessage({ type: "red", message: "Invalid email" });
    }
  };
  return (
    <section>
      <div className="form-container">
        <div>
          <h1>Password Reset</h1>
          <div className="control">
            <input
              type="email"
              id="floatingInput"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p style={{ color: message.type }}>{message.message}</p>
          <div className="control">
            <input type="submit" onClick={handleSubmit} value="Reset" />
          </div>
          <div className="link">
            <Link className="a" to="/login">
              Go back
            </Link>
            <Link className="a" to="/signup">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
