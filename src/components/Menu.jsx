import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {
  CalendarMonthRounded as CalendarIcon,
  EventAvailableRounded as EventsIcon,
  ExpandLessRounded as ExpandLessIcon,
  ExpandMoreRounded as ExpandMoreIcon,
  GroupRounded as PeopleIcon,
  HomeRounded as HomeIcon,
  LibraryBooksRounded as ReportsIcon,
  MeetingRoomRounded as ChurchMeetingsIcon,
  SettingsRounded as SettingsIcon,
  TrendingDownRounded as ExpensesIcon
} from "@mui/icons-material";
import { Cube as AssetsIcon } from "./icons";
import { alpha } from "@mui/material/styles";

const SingleLevelMenuItem = ({ item, color, setDrawerOpen, location, navigate }) => {

  return (
    <ListItemButton
      selected={location.pathname.indexOf(item.to) === 0}
      onClick={() => {
        navigate(item.to);
        if (typeof setDrawerOpen === "function") {
          setDrawerOpen(false);
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

const SideMenu = ({ highlightColor, setDrawerOpen, user, ...rest }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      setItems([
        {
          title: "Dashboard",
          icon: <HomeIcon />,
          to: "/dashboard",
          show: true,
        },
        {
          title: "Members",
          icon: <PeopleIcon />,
          to: "/members",
          show: user.privileges.members,
        },
        {
          title: "Calendar",
          icon: <CalendarIcon />,
          to: "/calendar",
          show: user.privileges.calendar,
          items: [
            {
              title: "Church Meetings",
              icon: <ChurchMeetingsIcon />,
              to: "/calendar/church-meetings",
              show: user.privileges.calendar__church_meetings,
            },
            {
              title: "Other Events",
              icon: <EventsIcon />,
              to: "/calendar/other-events",
              show: user.privileges.calendar__other_events,
            },
          ],
        },
        {
          title: "Assets",
          icon: <AssetsIcon />,
          to: "/assets",
          show: user.privileges.assets,
        },
        {
          title: "Users",
          icon: <PeopleIcon />,
          to: "/users",
          show: user.privileges.users,
        },
        {
          title: "Reports",
          icon: <ReportsIcon />,
          to: "/reports",
          show: user.privileges.reports,
          items: [
            {
              title: "Stock Summary Report",
              icon: <ReportsIcon />,
              to: "/reports/stock-summary",
              show: user.privileges.reports__stock_summary,
            },
            {
              title: "Expenses Report",
              icon: <ReportsIcon />,
              to: "/reports/expenses",
              show: user.privileges.reports__expenses,
            },
          ],
        },
        {
          title: "Settings",
          icon: <SettingsIcon />,
          to: "/settings",
          show: user.privileges.settings,
          items: [
            {
              title: "Registration Types",
              icon: <SettingsIcon />,
              to: "/settings/registration-types",
              show: user.privileges.settings__registration_types,
            },
            {
              title: "Member Statuses",
              icon: <SettingsIcon />,
              to: "/settings/member-statuses",
              show: user.privileges.settings__member_statuses,
            },
            {
              title: "Departments",
              icon: <SettingsIcon />,
              to: "/settings/departments",
              show: user.privileges.settings__departments,
            },
            {
              title: "Pledge Types",
              icon: <SettingsIcon />,
              to: "/settings/pledge-types",
              show: user.privileges.settings__pledge_types,
            },
            {
              title: "Payment Channels",
              icon: <SettingsIcon />,
              to: "/settings/payment-channels",
              show: user.privileges.settings__payment_channels,
            },
            {
              title: "Church Meeting Types",
              icon: <SettingsIcon />,
              to: "/settings/church-meeting-types",
              show: user.privileges.settings__church_meeting_types,
            },
            {
              title: "Church Meeting Roles",
              icon: <SettingsIcon />,
              to: "/settings/church-meeting-roles",
              show: user.privileges.settings__church_meeting_roles,
            },
          ],
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
      dense
      {...rest}
    >
      {generateMenuTree(items)}
    </List>
  );
};

export {
  HomeIcon,
  CalendarIcon,
  ChurchMeetingsIcon,
  EventsIcon,
  ExpensesIcon,
  PeopleIcon,
  AssetsIcon
};
export default SideMenu;
