// Google API Client Library
import { OAuth2Client } from "google-auth-library";

// jsonwebtoken
import { jwt } from "jsonwebtoken";

const client = new OAuth2Client();

const verifyCredential = async (token, client_id) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: client_id,
  });

  return ticket.getPayload();
};

// Properly handle the async nature of the verifyCredential function when calling
export { verifyCredential };
