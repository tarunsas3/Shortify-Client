import { useState, useEffect } from "react";
import { verifySignup } from "../utils/networkHandler";
import { useHistory } from "react-router-dom";

const Verify = (props) => {
  const [verified, setVerified] = useState({
    verified: false,
    message: "Hold on! Activating your profile....",
  });

  const history = useHistory();

  useEffect(() => {
    const verifyURL = async () => {
      let res = await verifySignup(props.match.params.hash);
      console.log(res);
      if (res.verified) {
        setVerified({ verified: res.verified, message: res.message });
        setTimeout(() => {
          history.push("/login");
        }, 3500);
      } else {
        setVerified({ verified: res.verified, message: res.message });
      }
    };
    verifyURL();
  }, [props.match.params.hash, history]);

  return (
    <section>
      <div className="form-container">
        <h3 className="activationMsg">{verified.message}</h3>
      </div>
    </section>
  );
};

export default Verify;
