const argon2 = require("argon2");
const bcrypt = require("bcrypt");
const SALTROUNDS = 10;

// // hash the password in plaintext
async function hash(plaintext) {
  // bcrypt
  // const salt = await bcrypt.genSalt(SALTROUNDS);
  // const hash = await bcrypt.hash(plaintext, salt);

  //argon2
  const hash = await argon2.hash(plaintext);

  return hash;
}

// verify password: compare plain password with hash (db)
async function verify(hash, plaintext) {
  // bcrypt
  // const verified = await bcrypt.compare(plaintext, hash);

  // argon
  const verified = await argon2.verify(hash, plaintext);

  console.log("Password verification:", verified);

  return verified;
}

module.exports = { hash, verify };
