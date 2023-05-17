import "./App.css";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import MyButton from "./components/MyButton";
import TourCard from "./components/TourCard";
import MyAppBar from "./components/MyAppBar";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, lime, blueGrey } from "@mui/material/colors";
import { Icon } from "@mui/material";
import AppBar_v2 from "./components/AppBar_v2";

function App() {
  const mktheme = createTheme({
    palette: {
      primary: {
        main: blueGrey[500],
      },
      secondary: {
        main: green[500],
      },
      mk: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={mktheme}>
      <div className="App">
        <MyAppBar />
        <Box component="main" sx={{ p: 1 }}>
          <MyButton />
          <Button variant="contained">Primary</Button>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
          <Button variant="contained" color="mk">
            <Icon>add</Icon>Custom palette
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
