import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function TourCard() {
  return (
    <Grid xs={3}>
      <Paper elevation={3}>
        <Typography variant="subtitle2">Hello, paper!</Typography>
      </Paper>
    </Grid>
  );
}
