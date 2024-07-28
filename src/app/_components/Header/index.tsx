import React from "react";
import Image from "next/image";
import { Container, Box, Paper, Menu, MenuItem, Fade } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import theme from "@/theme";
import Link from "next/link";

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="lg">
      <Box component="header" sx={{ marginTop: 4, marginBottom: 3 }}>
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link href="/" passHref>
              <Image
                src="/assets/Logo_voluntariado.svg"
                alt="Logo"
                width={144}
                height={40}
                priority
              />
            </Link>
            <Box display="flex">
              <Box
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ cursor: "pointer" }}
              >
                <PersonOutlineIcon
                  sx={{ color: theme.palette.primary.main }}
                />
              </Box>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <Link
                  href="/events/create"
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem onClick={handleClose}>Crear eventos</MenuItem>
                </Link>
                <Link
                  href="/events"
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem onClick={handleClose}>Mis eventos</MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
              </Menu>
              <NotificationsNoneIcon
                sx={{ color: theme.palette.primary.main }}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
