import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {
  ExpandLessRounded as ExpandLessIcon,
  ExpandMoreRounded as ExpandMoreIcon,
  UpcomingOutlined as UpcomingIcon
} from "@mui/icons-material";
import { Film as MoviesIcon, Home as HomeIcon, TvPlay as TvSeriesIcon } from "./icons/index";
import { alpha } from "@mui/material/styles";

const SingleLevelMenuItem = ({ item, color, setDrawerOpen, location, navigate }) => {

  return (
    <ListItemButton
      selected={location.pathname.indexOf(item.to) === 0}
      onClick={() => {
        navigate(item.to);
        if (typeof setDrawerOpen === "function") {
          setDrawerOpen(true); // `true` for temporary drawer as the `open` prop is set to !isDrawerOpen
        }
      }}
      sx={{
        "&:hover, &.Mui-selected": {
          color,
          bgcolor: `${alpha(color, 0.08)} !important`,

          "& .MuiListItemIcon-root": {
            color: "inherit",
          }
        },
        borderRadius: (theme) => theme.shape.borderRadius,
        mx: { xs: 1, sm: 1, md: 1.5 },
        px: { xs: 1, sm: 1, md: 1.5 },
      }}
    >
      {item.icon ?
        <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
        : null
      }
      <ListItemText primary={item.title}/>
    </ListItemButton>
  );
};

const MultiLevelMenuItem = ({ item, color, location, generateMenuTree }) => {
  const [open, setOpen] = useState();

  return (
    <Box className="multilevel-item">
      <ListItemButton
        selected={location.pathname.indexOf(item.to) === 0}
        onClick={(event) => setOpen(open === item.to ? null : item.to)}
        sx={{
          "&:hover, &.Mui-selected": {
            color,
            bgcolor: `${alpha(color, 0.08)} !important`,

            "& .MuiListItemIcon-root": {
              color: "inherit",
            }
          },
          borderRadius: (theme) => theme.shape.borderRadius,
          mx: { xs: 1, sm: 1, md: 1.5 },
          px: { xs: 1, sm: 1, md: 1.5 },
        }}
      >
        {item.icon ?
          <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
          : null
        }
        <ListItemText primary={item.title}/>
        {open === item.to ? <ExpandLessIcon sx={{ ml: 0.5 }}/> : <ExpandMoreIcon sx={{ ml: 0.5 }}/>}
      </ListItemButton>

      <Collapse
        in={open === item.to}
        unmountOnExit
      >
        <List
          component="div"
          dense
          sx={{ pl: 2 }}
        >
          {generateMenuTree(item.items)}
        </List>
      </Collapse>
    </Box>
  );
};

const Menu = ({ highlightColor, drawerOpen, setDrawerOpen, user, ...rest }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      setItems([
        {
          title: "Home",
          icon: <HomeIcon />,
          to: "/dashboard",
          show: true,
        },
        {
          title: "Movies",
          icon: <MoviesIcon />,
          to: "/movies",
          show: true,
        },
        {
          title: "TV Series",
          icon: <TvSeriesIcon />,
          to: "/tv-series",
          show: true,
        },
        {
          title: "Upcoming",
          icon: <UpcomingIcon />,
          to: "/upcoming",
          show: true,
        },
      ]);
    } else {
      setItems([]);
    }
  }, [user]);

  const generateMenuTree = (items) => {
    if (!items) return null;

    return items.filter((e) => (typeof e.show === "boolean") && e.show).map(e => {
      const hasChildren = e.items && e.items.filter((e) => (typeof e.show === "boolean") && e.show).length;
      return (
        hasChildren ?
          <MultiLevelMenuItem
            key={e.to}
            item={e}
            color={highlightColor}
            location={location}
            generateMenuTree={generateMenuTree}
          />
          :
          <SingleLevelMenuItem
            key={e.to}
            item={e}
            color={highlightColor}
            setDrawerOpen={setDrawerOpen}
            location={location}
            navigate={navigate}
          />
      );
    });
  };

  return (
    <List
      component="nav"
      {...rest}
    >
      {generateMenuTree(items)}
    </List>
  );
};

export default Menu;
