import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Card, Divider, Grid, Skeleton, Stack, Typography } from "@mui/material";
import {
  LabelOutlined as LabelIcon,
  ListRounded as ListIcon,
  PlayCircleRounded as PlayIcon,
  ScheduleRounded as ScheduleIcon,
  StarRounded as RateIcon
} from "@mui/icons-material";
import PosterBase from "../../components/PosterBase";
import { useFetch, useToast } from "../../hooks";
import { formatError, getReleaseDate, numberFormat } from "../../helpers";
import { BASE_POSTER_URL } from "../../constants";

const MovieDetails = () => {

  const addToast = useToast();

  const { id } = useParams();
  const { data, loading, error } = useFetch(`movie/${id}`, null, true, null, (response) => response.data);

  useEffect(() => {
    document.title = `Movie Details - ${window.APP_NAME}`;
  }, []);

  useEffect(() => {
    if (error) {
      addToast({ message: formatError(error), severity: "error" });
    }
  }, [error]);

  return (
    <React.Fragment>
      {loading ?
        <Skeleton
          variant="rounded"
          height={320}
          sx={{ mb: 2 }}
        />
        : null
      }
      {data ?
        <React.Fragment>
          <Card>
            <PosterBase
              path={`${BASE_POSTER_URL + data.poster_path}`}
              height={320}
            >
              <Box
                position="absolute"
                width="100%"
                height="inherit"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
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
                  Watch Trailer
                </Button>
              </Box>
            </PosterBase>
          </Card>
          <Box
            mt={1}
            px={2}
          >
            <Grid
              container
              spacing={{ xs: 2, sm: 2, md: 3 }}
            >
              <Grid
                item
                md={9}
                sm={12}
                xs={12}
              >
                <Typography
                  variant="h5"
                  fontWeight="500"
                  color="text.primary"
                >
                  {data.original_title}
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
                    {getReleaseDate(data.release_date)}
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
                    {data.vote_average}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {data.runtime} minutes
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    <LabelIcon fontSize="small"/>
                    {" "}
                    {data.genres.map((e) => e.name).join(", ")}
                  </Typography>
                </Stack>

                <Typography mt={2}>
                  {data.overview}
                </Typography>

                <Typography
                  variant="subtitle1"
                  fontWeight="500"
                  mt={2}
                >
                  Production company:
                  <Typography color="text.secondary">
                    {" "}
                    {data.production_companies.map((e) => e.name).join(", ")}
                  </Typography>
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight="500"
                  mt={2}
                >
                  Budget:
                  <Typography color="text.secondary">
                    {" "}
                    {"$"}{numberFormat(data.budget || 0)}
                  </Typography>
                </Typography>
              </Grid>

              <Grid
                item
                md={3}
                sm={12}
                xs={12}
              >
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  size="large"
                  startIcon={<ScheduleIcon />}
                  sx={{
                    mt: 1,
                    mb: 2,
                  }}
                >
                  See showtimes
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  disableElevation
                  size="large"
                  startIcon={<ListIcon />}
                  sx={{ mb: 2 }}
                >
                  More watch options
                </Button>
              </Grid>
            </Grid>
          </Box>

        </React.Fragment>
        : null
      }
    </React.Fragment>
  );
};

export default MovieDetails;
