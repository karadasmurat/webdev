// Let's start with a (very) naïve imperative solution:
function countGoodPasswords(passwords) {
  const goodPasswords = [];
  for (let i = 0; i < passwords.length; i++) {
    const password = passwords[i];
    if (password.length < 9) {
      continue;
    }
    goodPasswords.push(password);
  }
  return goodPasswords.length;
}

// Let's implement this same example using a declarative programming mindset:
function countGoodPasswords(passwords) {
  return passwords.filter((p) => p.length >= 9).length;
}
