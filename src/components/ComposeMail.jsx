import { Close, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  InputBase,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls.js";
const dialogStyle = {
  height: "90%",
  width: "80%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: "10px 10px 0px 0px ",
};

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background: #f2f6fc;
  & > p {
    font-size: 14px;
    font-weight: 500;
  }
`;

const RecipientWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  & > div {
    font-size: 14px;
    border-bottom: 1px solid #f5f5f5;
    margin-top: 10px;
  }
`;

const Footer = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  align-items: center;
`;

const SendButton = styled(Button)`
  background: #0b57d0;
  color: #fff;
  font-weight: 500;
  text-transform: none;
  border-radius: 18px;
  width: 100px;
`;

const ComposeMail = ({ openDialog, setOpenDialog }) => {
  const [data, setData] = useState({});
  const sentEmailService = useApi(API_URLS.saveSentEmail);
  const saveDraftService = useApi(API_URLS.saveDraftEmails);
  const config = {
    Host: "smtp.elasticemail.com",
    Username: import.meta.env.VITE_USERNAME,
    Password: import.meta.env.VITE_PASSWORD,
    Port: 2525,
  };

  const closeComposeMail = (e) => {
    e.preventDefault();

    const payload = {
      to: data.to,
      from: "chandru4395393@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: "Chandru Sending the Mail",
      starred: false,
      type: "drafts",
    };
    saveDraftService.call(payload);

    if (!saveDraftService.error) {
      setOpenDialog(false);
      setData({});
    }
  };
  const sendEmail = (e) => {
    e.preventDefault();

    if (window.Email) {
      window.Email.send({
        ...config,
        To: data.to,
        From: "chandru4395393@gmail.com",
        Subject: data.subject,
        Body: data.body,
      }).then((message) => alert(message));
    }

    const payload = {
      to: data.to,
      from: "chandru4395393@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: "Chandru Sending the Mail",
      starred: false,
      type: "sent",
    };
    sentEmailService.call(payload);

    if (!sentEmailService.error) {
      setOpenDialog(false);
      setData({});
    }

    setOpenDialog(false);
  };
  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  return (
    <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
      <Header>
        <Typography>New Message</Typography>
        <Close
          fontSize="small"
          style={{ cursor: "pointer" }}
          onClick={(e) => closeComposeMail(e)}
        />
      </Header>
      <RecipientWrapper>
        <InputBase
          placeholder="Recipients"
          name="to"
          onChange={(e) => onValueChange(e)}
          // value={data.to}
        />
        <InputBase
          placeholder="Subject"
          name="subject"
          onChange={(e) => onValueChange(e)}
          // value={data.subject}
        />
      </RecipientWrapper>
      <TextField
        multiline
        rows={20}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        name="body"
        onChange={(e) => onValueChange(e)}
        // value={data.body}
      />
      <Footer>
        <SendButton onClick={(e) => sendEmail(e)}>Send</SendButton>
        <DeleteOutline onClick={() => setOpenDialog(false)} />
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
