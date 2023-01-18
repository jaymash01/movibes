import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContextProvider } from "../contexts/ToastContext";
import lightTheme from "../themes/light";
import darkTheme from "../themes/dark";

import AuthLayout from "../layouts/Auth";
import DefaultLayout from "../layouts/Default";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import MembersRoutes from "../pages/members/MembersRoutes";
import CalendarRoutes from "../pages/calendar/CalendarRoutes";
import Users from "../pages/users/Users";
import ReportsRoutes from "../pages/reports/ReportsRoutes";
import SettingsRoutes from "../pages/settings/SettingsRoutes";

const App = () => {
  const [themeMode, setThemeMode] = useState(window.localStorage.getItem("theme_mode") || "light");

  const theme = useMemo(() => {
    return themeMode === "light" ? lightTheme : darkTheme;
  }, [themeMode]);

  const [user, setUser] = useState();

  return (
    <ThemeProvider theme={theme}>
      <ToastContextProvider>
        <CssBaseline />
        <GlobalStyles
          styles={{
            "html, body": {
              ...(themeMode === "light" && {
                backgroundImage: `url("/images/background.png")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
              }),
            },
            ".MuiDrawer-paper": {
              scrollbarWidth: "thin",
            },
            ".MuiDrawer-paper::-webkit-scrollbar": {
              width: 8,
              height: 8,
            },
            ".MuiDrawer-paper::-webkit-scrollbar-thumb": {
              borderRadius: 8,
            },
            "*::selection": {
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
            }
          }}
        />
        <Router>
          <Routes>
            <Route
              path="/"
              exact
              element={<Navigate to="/login"/>}
            />
            <Route
              path="/"
              element={<AuthLayout />}
            >
              <Route
                path="/login"
                element={<Login />}
              />
            </Route>
            <Route
              path="/"
              element={(
                <DefaultLayout
                  setThemeMode={setThemeMode}
                  setUser={setUser}
                />
              )}
            >
              <React.Fragment>
                <Route
                  path="dashboard"
                  element={<Dashboard />}
                />
                <Route
                  path="members/*"
                  element={user && user.privileges.members ? <MembersRoutes /> : null}
                />
                <Route
                  path="calendar/*"
                  element={user && user.privileges.calendar ? <CalendarRoutes /> : null}
                />
                <Route
                  path="assets"
                  element={user && user.privileges.assets ? <div /> : null}
                />
                <Route
                  path="users"
                  element={user && user.privileges.users ? <Users /> : null}
                />
                <Route
                  path="reports/*"
                  element={user && user.privileges.reports ? <ReportsRoutes /> : null}
                />
                <Route
                  path="settings/*"
                  element={user && user.privileges.settings ? <SettingsRoutes /> : null}
                />
              </React.Fragment>
            </Route>
          </Routes>
        </Router>
      </ToastContextProvider>
    </ThemeProvider>
  );
};

export default App;
