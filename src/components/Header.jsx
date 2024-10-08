import { AppBar, Toolbar, styled, InputBase, Box } from "@mui/material";
import {
  Menu as MenuIcon,
  Search,
  Tune,
  HelpOutlineOutlined,
  SettingsOutlined,
  AppsOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { gmailLogo } from "../constants/constant";
import "../App.css"

// Update AppBar to be fixed and responsive
const StyledAppBar = styled(AppBar)({
  background: "#F5F5F5",
  boxShadow: "none",
  position: "fixed",  // Fixed header
  zIndex: 1300,       // Ensure the AppBar stays above other content
  width: "100%",      // Full width
});

// SearchWrapper with responsiveness
const SearchWrapper = styled(Box)(({ theme }) => ({
  background: "#EAF1FB",
  marginLeft: 80,
  borderRadius: 8,
  height: 48,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  width: "100%",
  maxWidth: 720,       // Maximum width for larger screens
  [theme.breakpoints.down('sm')]: {
    marginLeft:"100px",
    maxWidth: "100%",
    padding: "0 10px",
  },
}));

const OptionsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  "& > svg": {
    marginLeft: 100,
  },
  [theme.breakpoints.down('sm')]: {
    justifyContent: "space-between",  // Distribute icons evenly on small screens
    width: "100%",
    "& > svg": {
      marginLeft: 0,  // Remove margin between icons for smaller screens
    },
  },
}));

const LogoWrapper = styled("img")(({ theme }) => ({
  width: 110,
  marginLeft: 15,
  [theme.breakpoints.down('sm')]: {
    width: 80, // Adjust logo size for smaller screens
    marginLeft: 10,
  },
}));

const Header = ({ toggleDrawer }) => {
  return (
    <StyledAppBar>
      <Toolbar>
        <MenuIcon color="action" onClick={toggleDrawer} />
        <LogoWrapper src={gmailLogo} alt="logo" />
        <SearchWrapper>
          <Search color="action" />
          <InputBase placeholder="Search mail" fullWidth />
          <Tune color="action" />
        </SearchWrapper>
        <OptionsWrapper>
          <HelpOutlineOutlined color="action" />
          <SettingsOutlined color="action" />
          <AppsOutlined color="action" />
          <AccountCircleOutlined color="action" />
        </OptionsWrapper>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
