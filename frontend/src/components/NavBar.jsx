import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

function NavBar({ token }) {
  return (
    <Box mb={2}>
      <Button component={Link} to="/">
        Home
      </Button>
      {token ? (
        <Button component={Link} to="/profile">
          Profile
        </Button>
      ) : (
        <>
          <Button component={Link} to="/login">
            Login
          </Button>
          <Button component={Link} to="/register">
            Register
          </Button>
        </>
      )}
    </Box>
  );
}

export default NavBar;
