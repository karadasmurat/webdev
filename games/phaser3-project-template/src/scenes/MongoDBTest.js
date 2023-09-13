const { MongoClient } = require("mongodb");

export default class MongoDBTest extends Phaser.Scene {
  constructor() {
    super({ key: "mongodb" });
  }

  init() {
    // console.log("MongoDBTest: init");
    // this.run().catch(console.dir);
  }
  create() {}

  async initMongoClient() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    // this.client = new MongoClient(uri, {
    //   serverApi: {
    //     version: ServerApiVersion.v1,
    //     strict: true,
    //     deprecationErrors: true,
    //   },
    // });
  }

  //   async run() {
  //     try {
  //       // Connect the client to the server	(optional starting in v4.7)
  //       await this.client.connect();
  //       // Send a ping to confirm a successful connection
  //       await client.db("admin").command({ ping: 1 });
  //       console.log(
  //         "Pinged your deployment. You successfully connected to MongoDB!"
  //       );
  //     } finally {
  //       // Ensures that the client will close when you finish/error
  //       await client.close();
  //     }
  //   }
}
