import { useState, useEffect } from "react";
import { redirectURL } from "../utils/networkHandler";
const BASE_URL = "http://localhost:3000";

const RedirectURL = (props) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLongURL = async () => {
      console.log(props.location.pathname);
      let res = await redirectURL(BASE_URL + props.location.pathname);
      console.log(res);
      if (res.success) {
        setMessage("Loading...");
        window.location.replace(res.longURL);
      } else {
        setMessage("Invalid URL");
      }
    };
    fetchLongURL();
  }, []);

  return (
    <section>
      <div className="form-container">
        <h3 className="activationMsg">{message}</h3>
      </div>
    </section>
  );
};

export default RedirectURL;
