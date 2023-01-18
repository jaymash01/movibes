import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Box, Button, Divider, InputAdornment, LinearProgress } from "@mui/material";
import {
  Lock as LockIcon,
  Person2 as UsernameIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from "@mui/icons-material";
import Form from "../../components/Form";
import TextField from "../../components/TextField";


import { usePost } from "../../hooks";
import { formatError } from "../../helpers";

const LogIn = () => {
  const navigate = useNavigate();

  const formRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [formData, setFormData] = useState({
    username: undefined,
    password: undefined
  });
  const { data, loading, error, handlePost } = usePost("api/auth/login", formData);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = `Login - ${window.APP_NAME}`;
  }, []);

  useEffect(() => {
    if (data) {
      window.user = data.data.user;
      window.localStorage.removeItem("token");
      window.localStorage.setItem("token", data.data.token);
      window.setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formRef.current.validate()) {
      handlePost();
    }
  };

  const handleFeedback = () => {
    if (data || error) {
      return (
        <Alert
          variant="filled"
          severity={error ? "error" : "success"}
          sx={{ mb: 2 }}
        >
          {error ? formatError(error) : data ? data.message : null}
        </Alert>
      );
    }

    return null;
  };

  return (
    <React.Fragment>
      <Divider />
      <Box p={2}>
        {handleFeedback()}
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
            containerProps={{ sx: { mb: 2 } }}
            onChange={(value) => setFormData({ ...formData, password: value })}
          />
          <Button
            disabled={loading}
            fullWidth
            disableElevation
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Form>
      </Box>
      {loading && <LinearProgress />}
    </React.Fragment>
  );
};

export default LogIn;
