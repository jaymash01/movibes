import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContextProvider } from "./contexts/ToastContext";

import lightTheme from "./themes/light";
import darkTheme from "./themes/dark";

import DefaultLayout from "./layouts/Default";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Movies from "./pages/movies/Movies";
import MovieDetails from "./pages/movies/MovieDetails";
import TVSeries from "./pages/TVSeries";
import Upcoming from "./pages/movies/Upcoming";

const App = () => {
  const [themeMode, setThemeMode] = useState(window.localStorage.getItem("theme_mode") || "dark");

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
              path="/login"
              element={<Login />}
            />
            <Route
              path="/sign-up"
              element={<SignUp />}
            />
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
                  path="movies"
                  exact
                  element={<Movies />}
                />
                <Route
                  path="movies/:id"
                  element={<MovieDetails />}
                />
                <Route
                  path="tv-series"
                  element={<TVSeries />}
                />
                <Route
                  path="upcoming"
                  element={<Upcoming />}
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
