import { alpha, createTheme } from "@mui/material/styles";
import { amber, green, grey, lightBlue, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3dd2cc",
      contrastText: "#fff",
    },
    secondary: {
      main: "#3dd2cc",
      contrastText: "#fff",
    },
    info: {
      main: lightBlue[600],
      contrastText: "#fff",
    },
    success: {
      main: green[600],
      contrastText: "#fff",
    },
    warning: {
      main: amber[600],
      contrastText: "#fff",
    },
    error: {
      main: red[600],
      contrastText: "#fff",
    },
    neutral: {
      main: grey[400],
      contrastText: "#fff",
    },
    black: {
      main: "#000",
      contrastText: "#fff",
    },
    white: {
      main: "#fff",
      contrastText: "#000",
    },
    text: {
      secondary: "rgba(0, 0, 0, 0.58)",
    },
    background: {
      default: "#f2f4f7",
      paper: "#fff",
    },
    divider: "#e0e0e0",
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h6: {
      fontSize: 16,
    },
    subtitle1: {
      fontSize: 14,
    },
    subtitle2: {
      fontSize: 13,
    },
    body1: {
      fontSize: 13,
    },
    body2: {
      fontSize: 12,
    },
    button: {
      fontSize: 12,
    }
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: "0 8px 24px rgba(229, 228, 230, 0.4)",
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0 4px 16px 0 rgba(169, 184, 200, 0.15)",
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        sizeSmall: {
          fontSize: "0.75rem",
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          whiteSpace: "nowrap",
        },
        contained: {
          textTransform: "none",
        },
        outlined: {
          textTransform: "none",
        },
        sizeSmall: {
          fontSize: "0.75rem",
        },
        sizeLarge: {
          fontSize: "0.8rem",
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: alpha("#0072bb", 0.025),
          "&:not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e0e0e0 !important",
          },
          "&:hover:not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ddd !important",
          }
        },
        input: {
          "&.MuiInputBase-inputSizeSmall": {
            paddingTop: "10px",
            paddingBottom: "10px",
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: "4px",
          marginRight: "4px",
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          verticalAlign: "bottom",
          fontSize: "1.25rem",
        },
        fontSizeSmall: {
          fontSize: "1.05rem",
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        endAdornment: {
          top: "calc(50% - 0.8rem)",
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        }
      }
    },
    MuiSkeleton: {
      styleOverrides: {
        rounded: {
          borderRadius: 24,
        }
      }
    }
  }
});

export default theme;
