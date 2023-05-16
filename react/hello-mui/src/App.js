import "./App.css";
import Grid from "@mui/material/Unstable_Grid2";

import MyButton from "./components/MyButton";
import TourCard from "./components/TourCard";

function App() {
  return (
    <div className="App">
      <Grid container spacing={1}>
        <TourCard />

        <TourCard />

        <TourCard />

        <TourCard />
      </Grid>

      <MyButton />
    </div>
  );
}

export default App;
