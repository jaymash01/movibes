import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { alpha, styled, useTheme } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  Modal as MuiModal,
  Paper,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery
} from "@mui/material";
import { CloseRounded as CloseIcon, LightModeOutlined as LightModeIcon } from "@mui/icons-material";
import {
  Menu as MenuIcon,
  Moon as DarkModeIcon,
  Notifications as NotificationsIcon,
  Ticket as TicketIcon
} from "../components/icons";

import Menu from "../components/Menu";
import Search from "../components/Search";
import Modal from "../components/Modal";
import logo from "../images/logo.png";
import avatar from "../images/avatar.jpg";
import darkTheme from "../themes/dark";

const drawerWidth = 240;
const drawerOpenedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  borderTopRightRadius: theme.spacing(4),
});

const drawerClosedMixin = (theme) => ({
  width: 0,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  whiteSpace: "nowrap",
});

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  //zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up("md")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const PromotionContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "parentTheme"
})(({ theme, parentTheme }) => ({
  padding: theme.spacing(2),
  paddingTop: theme.spacing(4),
  position: "relative",
  margin: theme.spacing(3),
  backgroundColor: parentTheme.palette.mode === "light" ?
    theme.palette.background.paper : theme.palette.background.default,
}));

const PromotionIconContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  width: "48px",
  height: "48px",
  top: "-24px",
  left: "50%",
  marginLeft: "-24px",
  backgroundColor: alpha(theme.palette.primary.main, 0.88),
  borderRadius: "24px",
  zIndex: 5,
}));

const Default = ({ setThemeMode }) => {

  const modalRef = useRef();
  const navigate = useNavigate();
  const theme = useTheme();
  const breakpointDownMedium = useMediaQuery(theme.breakpoints.down("md"));
  const breakpointUpMedium = useMediaQuery(theme.breakpoints.up("md"));

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    name: "Joseph Mashauri"
  });

  const [appReady, setAppReady] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  useEffect(() => {
    window.setTimeout(() => setLoading(false), 1500);
  }, []);

  useEffect(() => {
    if (user) {
      if (!loading) {
        window.user = user;
        setUser(user);
        setAppReady(true);
      }
    }
  }, [user, loading]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleTheme = () => {
    const themeMode = theme.palette.mode === "light" ? "dark" : "light";
    window.localStorage.removeItem("theme_mode");
    window.localStorage.setItem("theme_mode", themeMode);
    setThemeMode(themeMode);
  };

  return (
    <React.Fragment>
      {appReady ?
        <React.Fragment>
          <AppBar
            open={isDrawerOpen}
            color="transparent"
            position="fixed"
            elevation={0}
            sx={{
              bgcolor: "background.default",
              "& .MuiIconButton-root": {
                bgcolor: (theme1) => theme1.palette.background.paper,
              }
            }}
          >
            <Toolbar>
              <Tooltip title="Toggle menu">
                <IconButton
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>

              <Box
                component="img"
                src={logo}
                alt="Logo"
                height={{ xs: 20, sm: 28, md: 32 }}
                display={{ xs: "block", sm: "block", md: "none" }}
              />

              <Search />

              <Box flexGrow={1}/>

              <Tooltip title={theme.palette.mode === "light" ? "Enable dark mode" : "Disable dark mode"}>
                <IconButton
                  sx={{ mx: 2 }}
                  onClick={toggleTheme}
                >
                  {theme.palette.mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
              </Tooltip>

              <Tooltip title="Notifications">
                <IconButton sx={{ mr: 2 }}>
                  <Badge
                    badgeContent="2"
                    color="error"
                  >
                    <NotificationsIcon color="action"/>
                  </Badge>
                </IconButton>
              </Tooltip>

              <Avatar>
                <Box
                  component="img"
                  src={avatar}
                  alt=""
                />
              </Avatar>
            </Toolbar>
          </AppBar>

          {/* Drawer for small screens */}
          {breakpointDownMedium ?
            <Drawer
              container={() => window.document.body}
              variant="temporary"
              open={!isDrawerOpen}
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
              <Toolbar>
                <Box
                  component="img"
                  src={logo}
                  alt="Logo"
                  height={28}
                />
                <Box flexGrow={1}/>
                <Tooltip title="Close menu">
                  <IconButton
                    sx={{ mr: -1 }}
                    onClick={toggleDrawer}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Toolbar>
              <Menu
                highlightColor={theme.palette.primary.main}
                setDrawerOpen={setIsDrawerOpen}
                user={user}
              />
            </Drawer>
            : null
          }
          {/*****/}

          <Box sx={{ display: "flex" }}>
            {/* Drawer for large screens */}
            {breakpointUpMedium ?
              <Drawer
                variant="permanent"
                open={isDrawerOpen}
                ModalProps={{ disableScrollLock: true }}
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  ...(isDrawerOpen && {
                    ...drawerOpenedMixin(theme),
                    "& .MuiDrawer-paper": {
                      ...drawerOpenedMixin(theme),
                      borderRightWidth: 0,
                    },
                  }),
                  ...(!isDrawerOpen && {
                    ...drawerClosedMixin(theme),
                    "& .MuiDrawer-paper": {
                      ...drawerClosedMixin(theme),
                      borderRightWidth: 0,
                    },
                  })
                }}
              >
                <Toolbar>
                  <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    width={128}
                  />
                </Toolbar>
                <Menu
                  highlightColor={theme.palette.primary.main}
                  drawerOpen={isDrawerOpen}
                  user={user}
                />
                <Box flexGrow={1}/>
                <ThemeProvider theme={darkTheme}>
                  <PromotionContainer parentTheme={theme}>
                    <PromotionIconContainer>
                      <TicketIcon />
                    </PromotionIconContainer>

                    <Typography variant="subtitle1">
                      Play movie quizzes and earn free tickets
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={1}
                    >
                      50k people are playing now
                    </Typography>

                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        display: "flex",
                        mt: 2,
                        mx: "auto",
                      }}
                    >
                      Play now
                    </Button>
                  </PromotionContainer>
                </ThemeProvider>
              </Drawer>
              : null
            }
            {/*****/}

            <Box
              component="main"
              flexGrow={1}
              minHeight="100vh"
              overflow="auto"
              display="flex"
              flexDirection="column"
              px={{ xs: 2, sm: 2, md: 3 }}
              py={2}
            >
              <Toolbar />
              <Box flexGrow={1}>
                <Outlet />
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                pt={3}
              >
                &copy; {new Date().getFullYear()} {window.APP_NAME}
              </Typography>
            </Box>
          </Box>
        </React.Fragment>
        : null
      }

      <Modal ref={modalRef}/>
      <MuiModal open={loading}>
        <Box
          display="flex"
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={96}/>
        </Box>
      </MuiModal>
    </React.Fragment>
  );
};

export default Default;
