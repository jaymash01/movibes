import React from "react";
import { Box, ButtonBase, Card, Typography } from "@mui/material";
import RateIcon from "@mui/icons-material/StarRounded";
import PosterBase from "./PosterBase";
import styled from "@mui/material/styles/styled";
import { BASE_POSTER_URL } from "../constants";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "inherit",
  "&:hover, &.Mui-focusVisible": {
    "& .MuiImageBackdrop-root": {
      backgroundColor: "rgba(0, 0, 0, 0.72)",
    }
  }
}));

const MovieCard = ({ movie, containerProps, onClick, children }) => {

  return (
    <Box {...(containerProps || {})}>
      <Card sx={{ height: 320 }}>
        <ImageButton onClick={onClick}>
          <PosterBase
            path={BASE_POSTER_URL + movie.poster_path}
            width="inherit"
            height="inherit"
          >
            <Box
              position="absolute"
              top="0"
              right="0"
              bgcolor="rgba(0, 0, 0, 0.72)"
              px={2}
              py={1}
              sx={{
                borderTopRightRadius: (theme) => theme.shape.borderRadius,
                borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                <RateIcon
                  fontSize="small"
                  sx={{ color: "warning.main" }}
                />
                {" "}
                {movie.vote_average}
              </Typography>
            </Box>
          </PosterBase>
        </ImageButton>
      </Card>
      {children}
    </Box>
  );
};

export default MovieCard;
