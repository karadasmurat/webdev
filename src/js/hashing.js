const bcrypt = require('bcrypt');
const saltRounds = 12;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// note that these 2 combinations are for the same! plaintext:
// when salt changes, of course, hash changes.
const salt1 = "$2b$12$ebQjj/D8wYWKN6FyqHvY9e"
const hp01 = "$2b$12$ebQjj/D8wYWKN6FyqHvY9ewDPVBioU.FSJkK0FjJQ/xyDonhjCJ9S";
const salt2 = "$2b$12$hc8EiOvpP2Kql0xYWiK51u"
const hp02 = "$2b$12$hc8EiOvpP2Kql0xYWiK51uLb7YoNS1Nn4CLdrd5lH87uOjzsxyKYm";

//async
async function hashPassword(password) {

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    console.log(salt);
    console.log(hash);

    return hash;
}

// sync
// const salt = bcrypt.genSaltSync(saltRounds);
// const hash = bcrypt.hashSync(myPlaintextPassword, salt);


async function checkPassword(plainPwd, hashedPwd) {

    const match = await bcrypt.compare(plainPwd, hashedPwd);

    if (match) {
        console.log("Hello, there!");
    } else {
        console.log("Not today take you.");
    }

}

//static check, assume hp comes from db.
// checkPassword(myPlaintextPassword, hp01);    // Hello, there!
// checkPassword(myPlaintextPassword, hp02);    // Hello, there!
checkPassword(someOtherPlaintextPassword, hp01); // Not today take you.



// dynamic check - create hash then compare
// hashPassword(myPlaintextPassword)
//     .then(hp => checkPassword(myPlaintextPassword, hp)); // Hello, there!

// hashPassword(myPlaintextPassword)
//     .then(hp => checkPassword(someOtherPlaintextPassword, hp)); // Not today take you.