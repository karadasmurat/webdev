import Card from "../components/Card.js";

export default class BackendDemo extends Phaser.Scene {
  constructor() {
    super({ key: "backend" });
  }

  create() {
    // this.fetchData();
    this.fetch();
  }

  fetchData() {
    axios.get("http://localhost:3000/api/todos/").then(function (response) {
      console.log("response.data: ", response.data);
      console.log("response.status: ", response.status);
      console.log("response.statusText: ", response.statusText);
      console.log("response.headers: ", response.headers);
      console.log("response.config: ", response.config);

      response.data.forEach((todo, index) => {
        const card = new Card(this, 20, index * 100 + 20, "card");
        console.log(todo.title);
      });
    });
  }

  async fetch() {
    const response = await axios.get("http://localhost:3000/api/todos/");
    response.data.forEach((todo, index) => {
      const card = new Card(this, 20, index * 100 + 20, todo.title);
      console.log(todo.title);
    });
  }
}
