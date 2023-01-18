import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Pagination,
  PaginationItem,
  Skeleton,
  Stack,
  Typography
} from "@mui/material";
import { ChevronLeftRounded as ChevronLeftIcon, ChevronRightRounded as ChevronRightIcon } from "@mui/icons-material";

import Modal from "../../components/Modal";
import MovieCard from "../../components/MovieCard";
import Select from "../../components/Select";
import { useFetch, useToast } from "../../hooks";
import { formatError, getReleaseDate, getYearOptions } from "../../helpers";

const Movies = () => {

  const addToast = useToast();
  const navigate = useNavigate();
  const modalRef = useRef();

  const [filterGenres, setFilterGenres] = useState([]);

  const [params, setParams] = useState({
    page: 1,
    year: undefined,
    genre_ids: undefined,
  });

  const { data: genres } = useFetch("genre/movie/list", {
    ...params,
    genre_ids: filterGenres.join(","),
  }, true, [], (response) => response.data.genres);
  const {
    data, loading,
    error, handleFetch
  } = useFetch("discover/movie", params, true, { page: 1, results: [] }, (response) => response.data);

  useEffect(() => {
    document.title = `Dashboard - ${window.APP_NAME}`;
  }, []);

  useEffect(() => {
    if (error) {
      addToast({ message: formatError(error), severity: "error" });
    }
  }, [error]);

  const toggleGenre = (genre) => {
    if (filterGenres.indexOf(genre.id) !== -1) {
      setFilterGenres(filterGenres.filter((e) => e !== genre.id));
    } else {
      setFilterGenres([...filterGenres, genre.id]);
    }
  };

  return (
    <React.Fragment>
      <CardHeader
        title="Movies"
        titleTypographyProps={{
          variant: "h5",
          fontWeight: 500,
        }}
        sx={{ px: 0 }}
      />

      <Stack
        direction="row"
        flexWrap="wrap"
        gap={1}
        mb={2}
      >
        {genres.map((e) => (
          <Chip
            key={e.id}
            label={e.name}
            color={filterGenres.indexOf(e.id) !== -1 ? "primary" : "default" }
            onClick={() => toggleGenre(e)}/>
        ))}
        <Select
          fullWidth
          placeholder="Year"
          options={getYearOptions()}
          clearable
          value={params.year || null}
          sx={{ "& .MuiInputBase-root.MuiInputBase-sizeSmall": { py: "4px" } }}
          onChange={(value) => setParams({ ...params, year: value })}
        />
      </Stack>

      <Grid
        container
        spacing={2}
      >
        {data.results.map((e) => (
          <Grid
            key={e.id}
            item
            md={3}
            sm={6}
            xs={12}
          >
            <MovieCard
              movie={e}
              onClick={() => navigate(`/movies/${e.id}/details`)}
            >
              <Box
                mt={1}
                px={2}
              >
                <Typography
                  variant="subtitle1"
                  noWrap
                  color="text.primary"
                >
                  {e.original_title}
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
                    {getReleaseDate(e.release_date)}
                  </Typography>
                </Stack>
              </Box>
            </MovieCard>
          </Grid>
        ))}

        {loading ?
          <React.Fragment>
            {[1, 2, 3, 4].map((e) => (
              <Grid
                key={e}
                item
                md={3}
                sm={6}
                xs={12}
              >
                <Skeleton
                  variant="rounded"
                  height={320}
                />
              </Grid>
            ))}
          </React.Fragment>
          : null
        }
      </Grid>
      <Stack
        direction="row"
        justifyContent="center"
        mt={3}
      >
        <Pagination
          page={data.page}
          count={data.total_pages}
          boundaryCount={3}
          shape="rounded"
          color="primary"
          onChange={(event, page) => setParams({ ...params, page })}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ChevronLeftIcon, next: ChevronRightIcon }}
              {...item}
            />
          )}
        />
      </Stack>
      <Modal ref={modalRef}/>
    </React.Fragment>
  );
};

export default Movies;
