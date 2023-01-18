import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  Skeleton,
  Typography
} from "@mui/material";
import { InfoRounded as InfoIcon, PlayArrowRounded as PlayIcon } from "@mui/icons-material";
import Modal from "../../components/Modal";
import PosterBase from "../../components/PosterBase";
import LoadingSkeleton from "./LoadingSkeleton";

import { useTheme } from "@mui/material/styles";
import { useFetch, useToast } from "../../hooks";
import { formatError } from "../../helpers";
import { BASE_POSTER_URL } from "../../constants";

const Dashboard = () => {

  const theme = useTheme();
  const addToast = useToast();

  const modalRef = useRef();

  const [params, setParams] = useState({
    //genres: 0,
  });

  const { data: popular, loading: loadingPopular, error: errorLoadingPopular } = useFetch("movie/popular", null, true, null, (response) => response.data.results[0]);
  const { data: genres, loading: loadingGenres, error: errorLoadingGenres } = useFetch("genre/movie/list", params, true, [], (response) => response.data.genres);

  useEffect(() => {
    document.title = `Dashboard - ${window.APP_NAME}`;
  }, []);

  useEffect(() => {
    if (errorLoadingPopular) {
      addToast({ message: formatError(errorLoadingPopular), severity: "error" });
    }
  }, [errorLoadingPopular]);

  return (
    <React.Fragment>
      {false && <LoadingSkeleton />}
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 3 }}
      >
        <Grid
          item
          md={8}
          sm={12}
          xs={12}
        >
          {loadingPopular ?
            <Skeleton
              variant="rounded"
              height={320}
            />
            : null
          }
          {popular ?
            <Card
              sx={{
                height: 320,
                mb: 2,
              }}
            >
              <PosterBase
                path={`${BASE_POSTER_URL + popular.poster_path}`}
                minHeight={320}
              >
                <Box
                  position="absolute"
                  bottom={16}
                  right={16}
                  display="flex"
                  flexDirection="row"
                  gap={2}
                  sx={{
                    "& .MuiButton-root": {
                      bgcolor: "rgba(255, 255, 255, 0.12)",
                    }
                  }}
                >
                  <Button
                    variant="contained"
                    disableElevation
                    size="large"
                    startIcon={<PlayIcon />}
                  >
                    Play
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    size="large"
                    startIcon={<InfoIcon />}
                  >
                    More info
                  </Button>
                </Box>
              </PosterBase>
            </Card>
            : null
          }
        </Grid>
        <Grid
          item
          md={4}
          sm={12}
          xs={12}
        >
          {loadingGenres ?
            <Skeleton
              variant="rounded"
              height={200}
            />
            : null
          }
          {genres.length ?
            <React.Fragment>
              <CardHeader
                title="Categories"
                titleTypographyProps={{
                  variant: "h6",
                  fontWeight: 500,
                }}
                action={(
                  <Button
                    color="neutral"
                    sx={{ textTransform: "none" }}
                  >
                    Check all
                  </Button>
                )}
                sx={{ pt: 0 }}
              />
              <Card>
                <CardContent sx={{ px: 4 }}>
                  {genres.filter((e, i) => i < 5).map((e) => (
                    <FormControlLabel
                      key={e.id}
                      control={(
                        <Checkbox
                          size="small"
                          onChange={(event) => event}
                        />
                      )}
                      label={(
                        <Typography
                          variant="body2"
                          sx={{ cursor: "pointer" }}
                          onClick={(event) => event}
                        >
                          {e.name}
                        </Typography>
                      )}
                      sx={{
                        width: "100%",
                        display: "flex",
                        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                      }}
                    />
                  ))}
                </CardContent>
                <CardActions sx={{ mt: -2 }}>
                  <Box flexGrow={1}/>
                  <Button
                    color="neutral"
                    sx={{ textTransform: "none" }}
                  >
                    See more
                  </Button>
                  <Box flexGrow={1}/>
                </CardActions>
              </Card>
            </React.Fragment>
            : null
          }

          <CardHeader
            title="Services"
            titleTypographyProps={{
              variant: "h6",
              fontWeight: 500,
            }}
            action={(
              <Button
                color="neutral"
                sx={{ textTransform: "none" }}
              >
                Check all
              </Button>
            )}
          />
          <Card>
            <CardContent sx={{ px: 4 }}>
              {[
                { id: 1, name: "Netflix" },
                { id: 2, name: "HBO" },
                { id: 3, name: "Netflix" },
                { id: 4, name: "HBO" },
                { id: 5, name: "Netflix" }
              ].map((e) => (
                <FormControlLabel
                  key={e.id}
                  control={(
                    <Checkbox
                      size="small"
                      onChange={(event) => event}
                    />
                  )}
                  label={(
                    <Typography
                      variant="body2"
                      sx={{ cursor: "pointer" }}
                      onClick={(event) => event}
                    >
                      {e.name}
                    </Typography>
                  )}
                  sx={{
                    width: "100%",
                    display: "flex",
                    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                />
              ))}
            </CardContent>
            <CardActions sx={{ mt: -2 }}>
              <Box flexGrow={1}/>
              <Button
                color="neutral"
                sx={{ textTransform: "none" }}
              >
                See more
              </Button>
              <Box flexGrow={1}/>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Modal ref={modalRef}/>
    </React.Fragment>
  );
};

export default Dashboard;
