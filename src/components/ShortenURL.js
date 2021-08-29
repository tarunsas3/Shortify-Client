import { useState } from "react";
import { Link } from "react-router-dom";
import { shortenURL } from "../utils/networkHandler";

const ShortenURL = ({ isLogged }) => {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setMessage("Loading.....");
    if (/(http(s?)):\/\//i.test(longURL)) {
      let res = await shortenURL(longURL);
      setMessage("");
      setShortURL(res.shortURL);
    } else {
      let newURL = "https://" + longURL;
      setLongURL(newURL);
      let res = await shortenURL(newURL);
      setMessage("");
      setShortURL(res.shortURL);
    }
  };

  return (
    <section>
      <div className="form-container">
        {isLogged && (
          <div>
            <h1>URL Shortner</h1>
            <div className="control">
              <div>
                <input
                  type="text"
                  placeholder="Enter URL"
                  value={longURL}
                  onChange={(e) => setLongURL(e.target.value)}
                />
                <div className="control">
                  <input type="submit" onClick={handleSubmit} value="Shorten" />
                </div>
              </div>
            </div>
            {shortURL.length > 0 && (
              <div className="control">
                <div>
                  <input
                    type="text"
                    placeholder="Shortified URL"
                    value={shortURL}
                    readOnly
                  />
                  <div className="control">
                    <input
                      type="submit"
                      onClick={() => {
                        navigator.clipboard.writeText(shortURL);
                      }}
                      value="Copy"
                    />
                  </div>
                </div>
              </div>
            )}
            <p style={{ color: "red" }}>{message}</p>
            <div className="link">
              <Link className="a" to="/dashboard">
                Dashboard
              </Link>
            </div>
          </div>
        )}
        {!isLogged && (
          <>
            <h3>You have to be logged in to access this page</h3>{" "}
            <Link to="/">Login</Link>{" "}
          </>
        )}
      </div>
    </section>
  );
};

export default ShortenURL;
