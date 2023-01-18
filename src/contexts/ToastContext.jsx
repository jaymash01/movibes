import React, { createContext, useCallback, useEffect, useState } from "react";
import { Alert, Fade, Stack } from "@mui/material";

const ToastContext = createContext();

const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (toasts.length) {
      const timer = window.setTimeout(() => setToasts(toasts => toasts.slice(1)), 5000);
      return () => window.clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = (toast) => {
    setToasts([...toasts, toast]);
  };

  const removeToast = useCallback((index) => {
    setToasts(toasts.filter((e, i) => i !== index));
  }, [toasts]);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <Stack
        position="fixed"
        zIndex={(theme) => theme.zIndex.snackbar}
        left={{ xs: 16, sm: 16, md: 24 }}
        bottom={{ xs: 16, sm: 16, md: 24 }}
        width={{ xs: "calc(100% - 32px)", sm: "calc(100% - 32px)", md: 360 }}
        direction="column"
        spacing={1}
      >
        {toasts.map((e, i) => (
          <Fade
            key={i}
            in
            timeout={500}
          >
            <Alert
              variant="filled"
              severity={e.severity || "info"}
              onClose={() => removeToast(i)}
              sx={{
                width: "100%",
                boxShadow: (theme) => theme.shadows[4],
              }}
            >
              {e.message}
            </Alert>
          </Fade>
        ))}
      </Stack>
    </ToastContext.Provider>
  );
};

export { ToastContextProvider };
export default ToastContext;
