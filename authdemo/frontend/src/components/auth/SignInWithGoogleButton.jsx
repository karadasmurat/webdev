import { GOOGLE_CLIENT_ID } from "../../config/env";
import { useRef, useEffect } from "react";

export default function SignInWithGoogleButton() {
  const GISBtnRef = useRef(null);

  // callback for ux_mode: "popup"
  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }

  // GIS - Render the sign-in button using JavaScript
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

  return (
    <div
      id="buttonDiv"
      ref={GISBtnRef}
      className="d-flex justify-content-center mb-3"
    ></div>
  );
}
