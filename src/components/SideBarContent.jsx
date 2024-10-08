import { useState } from "react";
import { Box, Button, styled, List, ListItem } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";
import { SIDEBAR_DATA } from "../config/sidebar.config";
import ComposeMail from "./ComposeMail";
import { useParams, NavLink } from "react-router-dom";
import { routes } from "../routes/routes";
import "../App.css";

const SideBarContent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { type } = useParams();

  const onComposeClick = () => {
    setOpenDialog(true);
  };

  return (
    <Box className="sidebar-container">
      <Button className="compose-button" onClick={onComposeClick}>
        <CreateOutlined />
        Compose
      </Button>

      <List className="sidebar-list">
        {SIDEBAR_DATA.map((data) => (
          <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
            <ListItem
              className={
                type === data.name.toLowerCase() ? "sidebar-active" : ""
              }
            >
              <data.icon fontSize="small" />
              {data.title}
            </ListItem>
          </NavLink>
        ))}
      </List>

      <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </Box>
  );
};

export default SideBarContent;
