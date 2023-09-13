export default class BackendDemo extends Phaser.Scene {
  //http://localhost:3000/api/todos/
  constructor() {
    super({ key: "backend" });
  }

  create() {
    this.fetchData();
    this.x = Phaser.Cameras;
  }

  fetchData() {
    axios.get("http://localhost:3000/api/todos/").then(function (response) {
      console.log("response.data: ", response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    });
  }
}
