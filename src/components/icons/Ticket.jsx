import React from "react";
import { createSvgIcon } from "@mui/material";

const AddMoney = createSvgIcon(
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M18 15v3m0 3v-3m0 0h-3m3 0h3"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h7.083A6.036 6.036 0 0 1 12 18c0-1.148.322-2.22.881-3.131A3.001 3.001 0 0 1 9 12a3 3 0 1 1 5.869.881A5.972 5.972 0 0 1 18 12c1.537 0 2.939.578 4 1.528V8a3 3 0 0 0-3-3H5zm7 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
      clipRule="evenodd"
    />
  </svg>,
  "AddMoney"
);

export default AddMoney;
