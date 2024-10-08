import { ListItem, Checkbox, Typography, Box } from "@mui/material";
import { StarBorder, Star } from "@mui/icons-material";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import "../App.css";


const Email = ({
  email,
  setStarredEmail,
  selectedEmails,
  setSelectedEmails,
}) => {
  const toggleStarredEmailService = useApi(API_URLS.toggleStarredMails);

  const navigate = useNavigate();

  const toggleStarredEmail = () => {
    toggleStarredEmailService.call({ id: email._id, value: !email.starred });
    setStarredEmail((prevState) => !prevState);
  };

  const handleChange = () => {
    if (selectedEmails.includes(email._id)) {
      setSelectedEmails((prevState) =>
        prevState.filter((id) => id !== email._id)
      );
    } else {
      setSelectedEmails((prevState) => [...prevState, email._id]);
    }
  };

  return (
    <ListItem className="email-wrapper">
      <Checkbox
        className="email-checkbox"
        size="small"
        checked={selectedEmails.includes(email._id)}
        onChange={() => handleChange()}
      />
      {email.starred ? (
        <Star
          className="email-star"
          fontSize="small"
          onClick={() => toggleStarredEmail()}
        />
      ) : (
        <StarBorder
          className="email-star"
          fontSize="small"
          onClick={() => toggleStarredEmail()}
        />
      )}
      <Box
        className="email-content"
        onClick={() => navigate(routes.view.path, { state: { email: email } })}
      >
        <Typography className="email-subject">
          To: {email.to.split("@")[0]}
        </Typography>
        <Typography className="email-indicator">Inbox</Typography>
        <Typography>
          {email.subject} {email.body && "-"} {email.body}
        </Typography>
        <Typography className="email-date">
          {new window.Date(email.date).getDate()}&nbsp;
          {new window.Date(email.date).toLocaleString("default", {
            month: "long",
          })}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default Email;
