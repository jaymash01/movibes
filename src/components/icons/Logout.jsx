import React from "react";
import { createSvgIcon } from "@mui/material";

const Logout = createSvgIcon(
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 12L15 8M19 12L15 16M19 12H9"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 21C9.02944 21 5 16.9706 5 12C5 7.02944 9.02944 3 14 3"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  "Logout"
);

export default Logout;
