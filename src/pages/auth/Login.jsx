import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography
} from "@mui/material";
import {
  KeyboardArrowLeftRounded as PrevIcon,
  KeyboardArrowRightRounded as NextIcon,
  Lock as LockIcon,
  Person2 as UsernameIcon,
  PlayCircleRounded as PlayIcon,
  StarRounded as RateIcon,
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
import { getReleaseDate } from "../../helpers";

const NowPlaying = () => {

  const [index, setIndex] = useState(0);

  const { data } = useFetch("movie/now_playing",
    { append_to_response: "images" },
    true,
    [],
    (response) => response.data.results
  );

  return (data.length ?
      <PosterBase
        path={`${BASE_POSTER_URL + data[index].poster_path}`}
        minHeight="100vh"
      >
        <Box
          position="absolute"
          width="100%"
          top="0"
          p={3}
        >
          <Typography color="primary.main">
            <PlayIcon />
            {" "}
            Now Playing
          </Typography>
        </Box>
        <Box
          position="absolute"
          width="100%"
          bottom="0"
          p={3}
        >
          <Typography
            variant="h4"
            noWrap
            color="text.primary"
          >
            {data[index].original_title}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            divider={(
              <Divider
                orientation="vertical"
                sx={{ height: (theme) => theme.spacing(2) }}
              />
            )}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {getReleaseDate(data[index].release_date)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              <RateIcon
                fontSize="small"
                sx={{ color: "warning.main" }}
              />
              {" "}
              {data[index].vote_average}
            </Typography>
          </Stack>
        </Box>
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: (theme) => theme.spacing(3),
            mt: "-1rem",
            zIndex: 10,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
          onClick={(event) => setIndex(index > 0 ? index - 1 : 0)}
        >
          <PrevIcon/>
        </IconButton>
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            right: (theme) => theme.spacing(3),
            mt: "-1rem",
            zIndex: 10,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
          onClick={(event) => setIndex(index < data.length - 1 ? index + 1 : 0)}
        >
          <NextIcon/>
        </IconButton>
      </PosterBase>
      : null
  );
};

const LogIn = () => {
  const navigate = useNavigate();

  const formRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [formData, setFormData] = useState({
    username: undefined,
    password: undefined
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = `Login - ${window.APP_NAME}`;
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
        md={6}
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
            display="block"
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
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<GoogleIcon />}
            >
              Login with Google
            </Button>

            <Divider>or</Divider>

            <Form
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <TextField
                ref={usernameRef}
                placeholder="Username"
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
                onChange={(value) => setFormData({ ...formData, username: value })}
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
                containerProps={{ sx: { mb: 1 } }}
                onChange={(value) => setFormData({ ...formData, password: value })}
              />
              <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <FormControlLabel
                  control={<Checkbox size="small"/>}
                  label={<Typography variant="body2">Remember me</Typography>}
                  sx={{ display: "flex" }}
                />
                <Link
                  variant="body2"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  Forgot password?
                </Link>
              </Stack>
              <Button
                fullWidth
                disableElevation
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                onClick={handleSubmit}
                sx={{ mb: 2 }}
              >
                Login
              </Button>

              <Typography
                variant="body2"
                align="center"
              >
                Don't have an account?
                <Link
                  variant="body2"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/sign-up");
                  }}
                >
                  {" "} Sign up for free
                </Link>
              </Typography>
            </Form>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        md={6}
        sm={12}
        xs={12}
        sx={{ display: { xs: "none", sm: "none", md: "block" } }}
      >
        <NowPlaying />
      </Grid>
    </Grid>
  );
};

export default LogIn;
