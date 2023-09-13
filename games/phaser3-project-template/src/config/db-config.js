// Access to variables in .env file via process.env.VAR_NAME
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { MongoClient, ServerApiVersion } = require("mongodb");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_CONN_STR, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * *   MongoDB   * * * * *
 */

const connect = async () => {
  await client
    .connect()
    .then(console.log("Connected to mongodb."))
    .catch((error) => console.log("Cannot connect. " + error));
};

module.exports = { client, connect };
