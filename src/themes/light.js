import { alpha, createTheme } from "@mui/material/styles";
import { amber, green, grey, lightBlue, purple, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#003b5c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#007682",
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
      main: grey[500],
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
    purple: {
      main: purple[400],
      contrastText: "#fff",
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
    fontFamily: "Custom, sans-serif",
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
    borderRadius: 5,
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
      },
      variants: [
        {
          props: { variant: "outlined-elevated" },
          style: {
            boxShadow: "0 4px 16px 0 rgba(169, 184, 200, 0.15)",
            border: "1px solid #e5e5e5",
          }
        }
      ]
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          "&.no-action-margin-right .MuiCardHeader-action": {
            marginRight: 0,
          }
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: 16,
          }
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
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: "auto",
        },
        flexContainerVertical: {
          "& > .MuiTab-root": {
            borderBottomWidth: 1,
            borderRadius: "5px 0 0 5px",
            marginBottom: "8px",

            "&:last-child": {
              marginBottom: 0,
            }
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          border: "1px solid #e0e0e0",
          borderBottomWidth: 0,
          borderRadius: "5px 5px 0 0",
          marginRight: "8px",
          backgroundColor: "#fff",
          minHeight: "auto",
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
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate",
          borderSpacing: 0,
          "&.has-footer > .MuiTableBody-root > .MuiTableRow-root:last-child > .MuiTableCell-root": {
            borderBottomWidth: 1,
            "&:first-of-type": {
              borderBottomLeftRadius: 0,
            },
            "&:last-child": {
              borderBottomRightRadius: 0,
            }
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: "1px solid #e0e0e0",
          padding: "8px 12px",
          "&:not(:last-child)": {
            borderRightWidth: 0,
            borderBottomWidth: 0,
          },
          "&:last-child": {
            borderBottomWidth: 0,
          }
        },
        head: {
          padding: "12px",
          backgroundColor: "#f2f4f7",
        },
        footer: {
          padding: "12px",
          backgroundColor: "#f2f4f7",
          fontSize: "0.75rem",
          fontWeight: 700,
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.expanded": {
            backgroundColor: alpha(lightBlue[600], 0.18),
          }
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& > .MuiTableRow-root:first-of-type > .MuiTableCell-root": {
            "&:first-of-type": {
              borderTopLeftRadius: 5,
            },
            "&:last-child": {
              borderTopRightRadius: 5,
            }
          }
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& > .MuiTableRow-root": {
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            "& > th": {
              padding: "12px",
              backgroundColor: "#f2f4f7",
              fontWeight: 500,
            },
            "&:last-child > .MuiTableCell-root": {
              borderBottomWidth: 1,
              "&:first-of-type": {
                borderBottomLeftRadius: 5,
              },
              "&:last-child": {
                borderBottomRightRadius: 5,
              }
            }
          }
        }
      }
    },
    MuiTableFooter: {
      styleOverrides: {
        root: {
          "& > .MuiTableRow-root": {
            "&:first-of-type > .MuiTableCell-root": {
              borderTopWidth: 0,
            },
            "&:last-child": {
              "& > .MuiTableCell-root": {
                borderBottomWidth: 1,
              },
              "& > .MuiTableCell-root:first-of-type": {
                borderBottomLeftRadius: 5,
              },
              "& > .MuiTableCell-root:last-child": {
                borderBottomRightRadius: 5,
              }
            }
          }
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
          borderRadius: 5,
        }
      }
    }
  }
});

export default theme;
