import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { resetPassword, verifyResetURL } from "../utils/networkHandler";

const Reset = (props) => {
  const [verified, setVerified] = useState({
    isVerified: false,
    message: "Hold on! Verifying URL",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState({ type: "", message: "" });
  const history = useHistory();

  console.log(props);

  useEffect(() => {
    const verifyURL = async () => {
      let res = await verifyResetURL({
        id: props.match.params.id,
        randomString: props.match.params.hash,
      });
      console.log(res);
      setVerified({ isVerified: res.verified, message: res.message });
    };
    verifyURL();
  }, []);

  const handleSubmit = async () => {
    if (newPassword.length > 0) {
      setMessage({ type: "", message: "" });
      if (newPassword === confirmNewPassword) {
        setMessage({ type: "green", message: "Loading...." });
        let res = await resetPassword({
          newPassword,
          id: props.match.params.id,
        });
        setMessage({
          type: res.success ? "green" : "red",
          message: res.message,
        });
        if (res.success) {
          setTimeout(() => {
            history.push("/login");
          }, 2000);
        }
      } else {
        setMessage({ type: "red", message: "Password does not match" });
      }
    } else {
      setMessage({ type: "red", message: "Enter password" });
    }
  };

  return (
    <>
      {verified.isVerified && (
        <div className="text-center">
          <main className="form-signin">
            <div>
              <h1 className="h3 mt-2 mb-3 fw-normal">Password Reset</h1>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control mb-2"
                  id="newPassword"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor="newPassword">New password</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control mb-2"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword">Confirm new password</label>
              </div>
              <p style={{ color: message.type }}>{message.message}</p>
              <button
                className="w-100 btn btn-lg btn-primary"
                onClick={handleSubmit}
              >
                Reset
              </button>
              <div className="form-cta mt-3">
                <Link to="/login">Go back</Link>
                <Link to="/signup">Create an account</Link>
              </div>
            </div>
          </main>
        </div>
      )}
      {!verified.isVerified && <h3>{verified.message}</h3>}
    </>
  );
};

export default Reset;
