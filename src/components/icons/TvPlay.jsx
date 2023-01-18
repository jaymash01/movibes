import React from "react";
import { createSvgIcon } from "@mui/material";

const StockSettings = createSvgIcon(
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="20.75" r="2"/>
    <circle cx="21" cy="20.75" r="2"/>
    <rect height="7" rx="1" ry="1" width="7" x="7" y="7.75"/>
    <rect height="7" rx="1" ry="1" width="7" x="15.5" y="7.75"/>
    <rect height="5" rx="1" ry="1" width="8" x="11" y="1.25"/>
    <path d="M23,16.25H5.5v-12c0-.014-.008-.027-.009-.041s.009-.027.009-.042A1.419,1.419,0,0,0,4.083,2.75H1a1,1,0,0,0,0,2H3.5v11.5a2,2,0,0,0,2,2H23a1,1,0,0,0,0-2Z"/>
  </svg>
  ,
  "StockSettings"
);

export default StockSettings;
