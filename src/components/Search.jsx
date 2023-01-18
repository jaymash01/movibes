import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, InputBase, ListItemButton, ListItemText, Paper, useAutocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchRounded";
import { alpha, styled } from "@mui/material/styles";

import useFetch from "../hooks/useFetch";
import { debounce } from "../helpers";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    width: "350px",
  }
}));

const SearchIconContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  left: 0,
  top: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchLoadingIndicatorContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchInputBase = styled(InputBase, { shouldForwardProp: (prop) => prop !== "loading" })(({ theme, loading }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`, // vertical padding + font size from searchIcon
    ...(loading && {
      paddingRight: `calc(1em + ${theme.spacing(3)})`,
    }),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    }
  }
}));

const Listbox = styled(Paper)(({ theme }) => ({
  width: 350,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  overflow: "auto",
  maxHeight: 200,
  "& .MuiListItemButton-root.Mui-focused": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  }
}));

const Search = ({ containerProps }) => {

  const navigate = useNavigate();

  const [params, setParams] = useState({
    query: "",
  });

  const {
    data,
    loading,
    error,
    handleFetch
  } = useFetch("search/movie", params, true, [], (response) => response.data.results);

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    options: data,
    getOptionLabel: (option) => option.original_title,
    isOptionEqualToValue: (option, value) => option.id === value.id,
    onChange: (event, value) => {
      if (value) {
        navigate(`/movies/${value.id}`);
      }
    },
    onInputChange: (event, value) => debounce(setParams({ ...params, query: value }), 1000)
  });

  return (
    <Box
      component="div"
      {...getRootProps()}
    >
      <SearchContainer {...containerProps}>
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
        <SearchInputBase
          placeholder="Search for movies, TV shows…"
          autoComplete="off"
          inputProps={{ ...getInputProps() }}
          loading={loading}
        />
        {loading ?
          <SearchLoadingIndicatorContainer>
            <CircularProgress
              size={24}
              color="primary"
            />
          </SearchLoadingIndicatorContainer>
          : null
        }
      </SearchContainer>
      {groupedOptions.length > 0 ? (
        <Listbox
          {...getListboxProps()}
          elevation={8}
        >
          {groupedOptions.map((option, index) => (
            <ListItemButton
              dense
              {...getOptionProps({ option, index })}
              key={option.id}
            >
              <ListItemText>{option.original_title}</ListItemText>
            </ListItemButton>
          ))}
        </Listbox>
      ) : null}
    </Box>
  );
};

export default Search;
