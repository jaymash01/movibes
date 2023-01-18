import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { alpha, useTheme } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  Modal as MuiModal,
  Paper,
  Popover,
  Stack,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery
} from "@mui/material";
import {
  ExpandMoreRounded as ExpandMoreIcon,
  LightModeOutlined as LightModeIcon,
  MoreVert as MoreIcon
} from "@mui/icons-material";
import { Avatar as AvatarIcon, Heart as HeartIcon, Menu as MenuIcon, Moon as DarkModeIcon } from "../components/icons";

import styled from "@mui/material/styles/styled";
import darkTheme from "../themes/dark";
import Menu from "../components/Menu";
import Modal from "../components/Modal";
import ChangePassword from "../pages/auth/ChangePassword";
import loader from "../../images/loader.svg";
import logoOnPrimary from "../../images/logo-on-primary.png";
import { useFetch } from "../hooks";
import { getNonNull } from "../helpers";

const drawerWidth = 240;

const FloatingActions = styled("div")(({ theme, parentTheme }) => ({
  backgroundColor: parentTheme.palette.mode === "light" ?
    parentTheme.palette.primary.main : parentTheme.palette.background.paper,
  borderRadius: `${parentTheme.shape.borderRadius}px 0 0 ${parentTheme.shape.borderRadius}px`,
  boxShadow: theme.shadows[8],
  position: "fixed",
  right: 0,
  top: "50%",
  marginTop: "-1em",
  zIndex: parentTheme.zIndex.drawer - 1,
  padding: parentTheme.spacing(1),
  "& .MuiIconButton-root": {
    border: `1px solid ${theme.palette.divider}`,
  },
  ...(parentTheme.palette.mode === "dark" && {
    border: `1px solid ${parentTheme.palette.divider}`,
    borderRightWidth: 0,
  }),
}));

const Default = ({ setThemeMode, setUser }) => {

  const modalRef = useRef();
  const navigate = useNavigate();
  const theme = useTheme();
  const breakpointDownMedium = useMediaQuery(theme.breakpoints.down("md"));
  const breakpointUpMedium = useMediaQuery(theme.breakpoints.up("md"));

  const [loading, setLoading] = useState(false);

  const { data: user, loading: loadingUser } = useFetch("api/user");

  const [appReady, setAppReady] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  useEffect(() => {
    setLoading(loadingUser);
  }, [loadingUser]);

  useEffect(() => {
    if (user) {
      window.user = user;
      setUser(user);
      setAppReady(true);
    }
  }, [user]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleTheme = () => {
    const themeMode = theme.palette.mode === "light" ? "dark" : "light";
    window.localStorage.removeItem("theme_mode");
    window.localStorage.setItem("theme_mode", themeMode);
    setThemeMode(themeMode);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountMenuAnchorEl(event.currentTarget);
    setIsAccountMenuOpen(true);
  };

  const handleAccountMenuClose = () => {
    setIsAccountMenuOpen(false);
    setAccountMenuAnchorEl(null);
  };

  const openChangePasswordModal = () => {
    let component = (
      <ChangePassword modal={modalRef.current}/>
    );

    modalRef.current.open("Change Password", component);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <React.Fragment>
      {appReady ?
        <React.Fragment>
          <ThemeProvider theme={darkTheme}>
            <AppBar
              color="primary"
              position="fixed"
              elevation={0}
              sx={{
                zIndex: theme.zIndex.drawer + 1,
                bgcolor: theme.palette.mode === "light" ? theme.palette.primary.main : "background.paper",
                "& .MuiIconButton-root": {
                  border: (theme1) => `1px solid ${theme1.palette.divider}`
                }
              }}
            >
              <Container disableGutters>
                <Toolbar>
                  <Tooltip title="Toggle menu">
                    <IconButton
                      sx={{
                        mr: 2,
                        display: { xs: "inline-flex", sm: "inline-flex", md: "none" },
                      }}
                      onClick={toggleDrawer}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Tooltip>

                  <Box
                    component="img"
                    src={logoOnPrimary}
                    alt="Logo"
                    height={36}
                  />

                  <Box flexGrow={1}/>

                  <Menu
                    highlightColor={theme.palette.info.main}
                    user={user}
                    sx={{
                      display: { xs: "none", sm: "none", md: "flex" },
                      "& .MuiListItemButton-root": {
                        mx: 0.5,
                      },
                      "& > .MuiListItemButton-root": {
                        bgcolor: (theme1) => alpha(theme1.palette.black.main, 0.18),
                      },
                      "& > .multilevel-item": {
                        position: "relative",
                        "& > .MuiListItemButton-root": {
                          bgcolor: (theme1) => alpha(theme1.palette.black.main, 0.18),
                        },
                        "& > .MuiCollapse-root": {
                          position: "absolute",
                          width: drawerWidth,
                          top: `calc(${theme.mixins.toolbar.minHeight}px - 12px)`,
                          left: 0,
                          bgcolor: theme.palette.mode === "light" ? theme.palette.primary.main: "background.paper",
                          border: (theme1) => `1px solid ${theme1.palette.divider}`,
                          boxShadow: (theme1) => theme1.shadows[8],
                          borderRadius: `${theme.shape.borderRadius}px`,
                          "& > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root": {
                            pl: 0,
                          },
                          "& .MuiListItemButton-root": {
                            mx: { xs: 1, sm: 1, md: 1.5 },
                          }
                        }
                      }
                    }}
                  />

                  <ListItemButton
                    dense
                    onClick={handleAccountMenuOpen}
                    sx={{
                      display: { xs: "none", sm: "none", md: "flex" },
                      flexGrow: 0,
                      bgcolor: (theme1) => alpha(theme1.palette.black.main, 0.18),
                      "&:hover, &.Mui-selected": {
                        color: theme.palette.info.main,
                        bgcolor: alpha(theme.palette.info.main, 0.08),

                        "& .MuiListItemIcon-root": {
                          color: "inherit",
                        }
                      },
                      borderRadius: theme.shape.borderRadius,
                      ml: 0.5,
                      px: { xs: 1, sm: 1, md: 1.5 },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <AvatarIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Me"/>
                    <ExpandMoreIcon sx={{ ml: 0.5 }}/>
                  </ListItemButton>

                  <Tooltip title={theme.palette.mode === "light" ? "Enable dark mode" : "Disable dark mode"}>
                    <IconButton
                      sx={{
                        ml: 2,
                        display: { xs: "inline-flex", sm: "inline-flex", md: "none" },
                      }}
                      onClick={toggleTheme}
                    >
                      {theme.palette.mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                  </Tooltip>

                  <IconButton
                    sx={{
                      ml: 2,
                      display: { xs: "inline-flex", sm: "inline-flex", md: "none" },
                    }}
                    onClick={handleAccountMenuOpen}
                  >
                    <MoreIcon />
                  </IconButton>
                </Toolbar>
              </Container>
              <Divider />
            </AppBar>
          </ThemeProvider>

          {/* Drawer for small screens */}
          {breakpointDownMedium ?
            <Drawer
              container={() => window.document.body}
              variant="temporary"
              open={isDrawerOpen}
              ModalProps={{
                keepMounted: true,
                disableScrollLock: true,
              }}
              sx={{
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              onClose={toggleDrawer}
            >
              <Toolbar />
              <Menu
                highlightColor={theme.palette.info.main}
                setDrawerOpen={setIsDrawerOpen}
                user={user}
              />
            </Drawer>
            : null
          }
          {/*****/}

          <Container
            component="main"
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Toolbar />
            <Box flexGrow={1}>
              <Outlet />
            </Box>
            <Paper
              variant="outlined-elevated"
              sx={{
                px: 2,
                mb: 2,
              }}
            >
              <Toolbar disableGutters>
                <Typography
                  textAlign="center"
                  flexGrow={1}
                >
                  &copy; {new Date().getFullYear()}. Developed with <HeartIcon /> by DigitCodes.
                </Typography>
              </Toolbar>
            </Paper>
          </Container>

          {breakpointUpMedium ?
            <ThemeProvider theme={darkTheme}>
              <FloatingActions parentTheme={theme}>
                <Stack
                  direction="column"
                  spacing={1}
                >
                  <Tooltip title={theme.palette.mode === "light" ? "Enable dark mode" : "Disable dark mode"}>
                    <IconButton
                      size="small"
                      onClick={toggleTheme}
                    >
                      {theme.palette.mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </FloatingActions>
            </ThemeProvider>
            : null
          }

          <Popover
            anchorEl={accountMenuAnchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={isAccountMenuOpen}
            onClose={handleAccountMenuClose}
          >
            <Card sx={{ width: 250 }}>
              <CardHeader
                title={user.full_name}
                subheader={getNonNull(user.department).name}
                titleTypographyProps={{
                  variant: "subtitle1",
                  fontWeight: "500",
                  noWrap: true,
                }}
                subheaderTypographyProps={{ noWrap: true }}
                avatar={(
                  <Avatar>
                    <AvatarIcon />
                  </Avatar>
                )}
              />
              <Divider />
              <MenuList dense>
                <ListItem disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={() => {
                      handleAccountMenuClose();
                      openChangePasswordModal();
                    }}
                  >
                    <ListItemText>Change Password</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={() => {
                      handleAccountMenuClose();
                      handleLogout();
                    }}
                  >
                    <ListItemText>Logout</ListItemText>
                  </ListItemButton>
                </ListItem>
              </MenuList>
            </Card>
          </Popover>
        </React.Fragment>
        : null
      }

      <Modal ref={modalRef}/>
      <MuiModal
        open={loading}
        hideBackdrop
      >
        <Box
          display="flex"
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            component="img"
            src={loader}
            alt=""
            width={96}
            height={96}
          />
        </Box>
      </MuiModal>
    </React.Fragment>
  );
};

export default Default;
