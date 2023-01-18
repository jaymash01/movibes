import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import Modal from "../components/Modal";
import PosterBase from "../components/PosterBase";
import MovieCard from "../components/MovieCard";
import { useFetch, useToast } from "../hooks";
import { formatError } from "../helpers";
import { BASE_POSTER_URL } from "../constants";

const Dashboard = () => {

  const addToast = useToast();
  const navigate = useNavigate();
  const modalRef = useRef();

  const [params, setParams] = useState({
    //genre_ids: [],
  });

  const {
    data: nowPlaying,
    loading: loadingNowPlaying,
    error: errorLoadingNowPlaying
  } = useFetch("movie/now_playing", null, true, null, (response) => response.data.results[0]);
  const {
    data: genres,
    loading: loadingGenres
  } = useFetch("genre/movie/list", params, true, [], (response) => response.data.genres);
  const {
    data: trending,
    loading: loadingTrending,
    error: errorLoadingTrending
  } = useFetch("movie/popular", params, true, [], (response) => response.data.results.filter((e, i) => i < 4));
  const {
    data: upcoming,
    loading: loadingUpcoming,
    error: errorLoadingUpcoming
  } = useFetch("movie/upcoming", params, true, [], (response) => response.data.results.filter((e, i) => i < 4));

  useEffect(() => {
    document.title = `Dashboard - ${window.APP_NAME}`;
  }, []);

  useEffect(() => {
    if (errorLoadingNowPlaying) {
      addToast({ message: formatError(errorLoadingNowPlaying), severity: "error" });
    }
  }, [errorLoadingNowPlaying]);

  useEffect(() => {
    if (errorLoadingTrending) {
      addToast({ message: formatError(errorLoadingTrending), severity: "error" });
    }
  }, [errorLoadingTrending]);

  useEffect(() => {
    if (errorLoadingUpcoming) {
      addToast({ message: formatError(errorLoadingUpcoming), severity: "error" });
    }
  }, [errorLoadingUpcoming]);

  return (
    <React.Fragment>
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
          {loadingNowPlaying ?
            <Skeleton
              variant="rounded"
              height={320}
            />
            : null
          }
          {nowPlaying ?
            <Card sx={{ height: 320 }}>
              <PosterBase
                path={`${BASE_POSTER_URL + nowPlaying.poster_path}`}
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
                      bgcolor: "rgba(0, 0, 0, 0.72)",
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

          {loadingTrending ?
            <Skeleton
              variant="rounded"
              height={360}
              sx={{ mt: 2 }}
            />
            : null
          }
          {trending.length ?
            <React.Fragment>
              <CardHeader
                title="Trending"
                titleTypographyProps={{
                  variant: "h5",
                  fontWeight: 500,
                }}
                action={(
                  <Button
                    color="neutral"
                    sx={{ textTransform: "none" }}
                    onClick={() => navigate("/movies")}
                  >
                    View all
                  </Button>
                )}
                sx={{ px: 0 }}
              />
              <Grid
                container
                spacing={2}
              >
                {trending.map((e) => (
                  <Grid
                    key={e.id}
                    item
                    md={3}
                    sm={6}
                    xs={12}
                  >
                    <MovieCard
                      movie={e}
                      onClick={() => navigate(`/movies/${e.id}`)}
                    />
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
            : null
          }

          {loadingUpcoming ?
            <Skeleton
              variant="rounded"
              height={360}
              sx={{ mt: 2 }}
            />
            : null
          }
          {upcoming.length ?
            <React.Fragment>
              <CardHeader
                title="Upcoming"
                titleTypographyProps={{
                  variant: "h5",
                  fontWeight: 500,
                }}
                action={(
                  <Button
                    color="neutral"
                    sx={{ textTransform: "none" }}
                    onClick={() => navigate("/movies/upcoming")}
                  >
                    View all
                  </Button>
                )}
                sx={{ px: 0 }}
              />
              <Grid
                container
                spacing={2}
              >
                {upcoming.map((e) => (
                  <Grid
                    key={e.id}
                    item
                    md={3}
                    sm={6}
                    xs={12}
                  >
                    <MovieCard
                      movie={e}
                      onClick={() => navigate(`/movies/${e.id}`)}
                    />
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
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
                sx={{
                  px: 0,
                  pt: 0,
                }}
              />
              <Card>
                <CardContent sx={{ px: 3 }}>
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
            sx={{ px: 0 }}
          />
          <Card>
            <CardContent sx={{ px: 3 }}>
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
