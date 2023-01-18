import React from "react";
import { createSvgIcon } from "@mui/material";

const Film = createSvgIcon(
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="8"
      fill="currentColor"
      r="2"
    />
    <circle
      cx="8"
      cy="12"
      fill="currentColor"
      r="2"
    />
    <circle
      cx="16"
      cy="12"
      fill="currentColor"
      r="2"
    />
    <circle
      cx="12"
      cy="16"
      fill="currentColor"
      r="2"
    />
    <path
      d="M12,2A10,10,0,0,0,6,20H2v2H12A10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
      fill="currentColor"
    />
  </svg>
  ,
  "Film"
);

export default Film;
