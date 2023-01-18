import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Divider, Grid, InputAdornment, Link, Typography } from "@mui/material";
import {
  AlternateEmail as EmailIcon,
  Lock as LockIcon,
  Person2 as UsernameIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from "@mui/icons-material";
import { Google as GoogleIcon } from "../../components/icons";
import PosterBase from "../../components/PosterBase";
import Form from "../../components/Form";
import TextField from "../../components/TextField";

import logo from "../../images/logo.png";
import useFetch from "../../hooks/useFetch";
import { BASE_POSTER_URL } from "../../constants";
const Descriptions = () => {

  const { data: popular } = useFetch("movie/popular", null, true, null, (response) => response.data.results[0]);

  return (popular ?
      <PosterBase
        path={`${BASE_POSTER_URL + popular.poster_path}`}
        minHeight="100vh"
      >
        <Box
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          p={{ xs: 2, sm: 2, md: 4 }}
        >
          <Box
            component="img"
            width={160}
            alt="Logo"
            src={logo}
          />

          <Box
            flexGrow={1}
            position="absolute"
            width="100%"
            bottom="0"
            pb={3}
          >
            <Typography
              variant="h5"
              color="text.primary"
              mb={2}
            >
              Benefits of your {window.APP_NAME} account
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.primary"
            >
              Personalized Recommendations
            </Typography>
            <Typography
              noWrap
              color="text.secondary"
              mb={2}
            >
              Discover shows you'll love.
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.primary"
            >
              Your Ratings
            </Typography>
            <Typography
              noWrap
              color="text.secondary"
              mb={2}
            >
              Rate and remember everything you've seen.
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.primary"
            >
              Contribute to {window.APP_NAME}
            </Typography>
            <Typography
              noWrap
              color="text.secondary"
              mb={4}
            >
              Add data that will be seen by millions of people and get cool badges.
            </Typography>
          </Box>
        </Box>
      </PosterBase>
      : null
  );
};

const SignUp = () => {
  const navigate = useNavigate();

  const formRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [formData, setFormData] = useState({
    name: undefined,
    email: undefined,
    password: undefined
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = `Create Account - ${window.APP_NAME}`;
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formRef.current.validate()) {
      navigate("/movies");
    }
  };

  return (
    <Grid
      component="main"
      container
    >
      <Grid
        item
        md={7}
        sm={12}
        xs={12}
        sx={{ display: { xs: "none", sm: "none", md: "block" } }}
      >
        <Descriptions />
      </Grid>
      <Grid
        item
        md={5}
        sm={12}
        xs={12}
        sx={{
          bgcolor: (theme) => theme.palette.mode === "light" ? "background.paper" : "background.default",
          minHeight: "100vh",
        }}
      >
        <Box
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          p={{ xs: 2, sm: 2, md: 4 }}
        >
          <Box
            component="img"
            display={{ xs: "block", sm: "block", md: "none" }}
            width={160}
            mb={2}
            alt="Logo"
            src={logo}
          />

          <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={3}
            sx={{
              "& > *": { width: "100%" },
              width: { xs: "100%", sm: "50%", md: "320px " },
              mx: "auto",
            }}
          >
            <Box mb={2}>
              <Typography
                variant="h5"
                align="center"
              >
                Create an account
              </Typography>
              <Typography
                variant="body2"
                align="center"
              >
                Let's get started with your 30-day free trial.
              </Typography>
            </Box>

            <Form
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <TextField
                ref={nameRef}
                placeholder="Name"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <UsernameIcon />
                    </InputAdornment>
                  ),
                }}
                containerProps={{ sx: { mb: 2 } }}
                onChange={(value) => setFormData({ ...formData, name: value })}
              />
              <TextField
                ref={emailRef}
                placeholder="Email"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                containerProps={{ sx: { mb: 2 } }}
                onChange={(value) => setFormData({ ...formData, email: value })}
              />
              <TextField
                ref={passwordRef}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </InputAdornment>
                  ),
                }}
                containerProps={{ sx: { mb: 2 } }}
                onChange={(value) => setFormData({ ...formData, password: value })}
              />
              <Button
                fullWidth
                disableElevation
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                onClick={handleSubmit}
                sx={{ mb: 1 }}
              >
                Create Account
              </Button>

              <Divider sx={{ mb: 1 }}>or</Divider>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<GoogleIcon />}
                sx={{ mb: 2 }}
              >
                Sign up with Google
              </Button>

              <Typography
                variant="body2"
                align="center"
              >
                Already have an account?
                <Link
                  variant="body2"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/login");
                  }}
                >
                  {" "} Login
                </Link>
              </Typography>
            </Form>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
