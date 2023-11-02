import { GOOGLE_CLIENT_ID } from "../../config/env";
import { useRef, useEffect, useState } from "react";

// import axios with a configuration
import axios from "../../config/axios-config";

export default function SignInWithGoogleButton() {
  const [IDToken, setIDToken] = useState("");
  const GISBtnRef = useRef(null);

  // GIS - Render the sign-in button using JavaScript *on mount*
  // The google.accounts.id.initialize method initializes the Sign In With Google client based on the configuration object.
  // Notice "window.onload" vs useEffect(()=>{}, [])
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      ux_mode: "popup",
      callback: handleCredentialResponse,
    });

    // render Sign In With Google button
    // Notice document.getElementById("buttonDiv") vs GISBtnRef.current
    google.accounts.id.renderButton(GISBtnRef.current, {
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "circle",
      width: "250",
    });
  }, []);

  // Send the token to your app's backend, to sign in or sign up a user
  useEffect(() => {
    if (IDToken) {
      console.log("Sending ID Token to backend.");
      axios
        .post("auth/google/redirect", {
          credential: IDToken,
        })
        .then(function (resp) {
          console.log(resp);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [IDToken]);

  // callback for ux_mode: "popup"
  function handleCredentialResponse(credentialResponse) {
    console.log("Encoded JWT ID token: " + credentialResponse.credential);

    // To sign in or sign up a user with an ID token, send the token to your app's backend.
    // axios.post(); // moved into a useEffect instead.

    // update state, so that related effect will run - axios.post()
    setIDToken(credentialResponse.credential);
  }

  return (
    <div
      id="buttonDiv"
      ref={GISBtnRef}
      className="d-flex justify-content-center mb-3"
    ></div>
  );
}
