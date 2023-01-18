import React from "react";
import { createSvgIcon } from "@mui/material";

const Notifications = createSvgIcon(
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23,25H9a3,3,0,0,1-3-3v-9.1A8.92,8.92,0,0,1,14.91,4h2.18A8.92,8.92,0,0,1,26,12.91V22A3,3,0,0,1,23,25ZM14.91,6A6.92,6.92,0,0,0,8,12.91V22a1,1,0,0,0,1,1H23a1,1,0,0,0,1-1v-9.1A6.92,6.92,0,0,0,17.09,6Z"
      fill="currentColor"
    />
    <path
      d="M20,30H12a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Z"
      fill="currentColor"
    />
  </svg>
  ,
  "Notifications"
);

export default Notifications;
