import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
// import { Typography, Box, Button } from "@mui/material";

import { pink, green } from "@mui/material/colors";

import HomeIcon from "@mui/icons-material/Home";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Icon from "@mui/material/Icon";
import { Box } from "@mui/material";

export default function TourCard() {
  return (
    <Grid xs={3}>
      <Paper elevation={3}>
        <Typography variant="h3" component="h5" mb={3}>
          h1. Heading
        </Typography>
        <Typography variant="subtitle2">Hello, paper!</Typography>
        <HomeRoundedIcon color="primary" fontSize="large" />
        <LockRoundedIcon sx={{ color: pink[500] }} />
        <HomeRoundedIcon sx={{ color: pink[500], fontSize: 40 }} />
        <Icon sx={{ color: green[500] }}>face</Icon>

        <Box sx={{ display: "flex" }}>
          <Rating
            name="read-only"
            value={3.5}
            precision={0.5}
            // icon={<FavoriteIcon fontSize="inherit" />}
            // emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            size="small"
            readOnly
          />
          <Typography variant="body2" component="p" ml={1}>
            3.5
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}
