import Card from "./components/Card";
import mkImg from "./assets/images/mk.jpeg";

function App() {
  return (
    <>
      {/* <Navbar />*/}
      {/* <MoveIt /> */}
      {/* <HelloFramer /> */}
      {/* <HelloVariants /> */}
      <div className="d-flex justify-content-center gap-2">
        <Card> {Math.floor(Math.random() * 9) + 1} </Card>
        <Card> x </Card>
        <Card>
          <img src={mkImg} alt="image" />{" "}
        </Card>
      </div>
    </>
  );
}

export default App;
