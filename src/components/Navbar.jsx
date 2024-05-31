import { Box, Flex, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="brand.700" px={4} py={2}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <NavLink to="/" style={{ marginRight: "20px", color: "white", textDecoration: "none" }}>
            Home
          </NavLink>
          <NavLink to="/events" style={{ color: "white", textDecoration: "none" }}>
            Events
          </NavLink>
          <NavLink to="/venues" style={{ color: "white", textDecoration: "none", marginLeft: "20px" }}>
            Venues
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;