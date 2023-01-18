import React from "react";
import { Box, ThemeProvider } from "@mui/material";

import darkTheme from "../themes/dark";

const PosterBase = ({ path, children, ...rest }) => {

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        position="relative"
        overflow="hidden"
        {...(rest || {})}
        sx={{
          background: `transparent url(${path}) no-repeat center`,
          backgroundSize: "cover",
        }}
      >
        <Box
          position="absolute"
          width="100%"
          height="100%"
          bgcolor="rgba(0, 0, 0, 0.62)"
          className="MuiImageBackdrop-root"
        />
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default PosterBase;
