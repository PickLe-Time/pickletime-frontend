import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import LogoIcon from '../Logo/LogoIcon.jsx';

import useUser from '../../hooks/useUser.jsx';

let pages = [];

// Template: ResponsiveAppBar from MUI
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useUser();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    { icon: <PersonIcon fontSize="small" />, text: 'Profile', path: `user/${user?.username}` },
    { icon: <ManageAccountsIcon fontSize="small" />, text: 'Account', path: `user/${user?.username}/account` },
    { icon: <Logout fontSize="small" />, text: 'Sign out', path: 'logout' },
  ];

  // If admin, add admin page tab
  if (user?.role === 'ADMIN') {
    pages = [
      { text: 'Scheduler', path: 'scheduler' },
      { text: 'Dashboard', path: 'admin' },
    ];
  } else {
    pages = [
      { text: 'Scheduler', path: 'scheduler' },
    ];
  }

  return (
    <AppBar position="static">
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            component={Link}
            to="/"
            aria-label="home"
          >
            <LogoIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PickLeTime
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.text}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={`/${page.path}`}
                >
                  <Typography
                    variant="body1"
                    textAlign="center"
                    key={page.path}
                    sx={{ color: 'inherit', display: 'block', textDecoration: 'none' }}
                  >
                    {page.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/scheduler"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PickLeTime
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={`/${page.path}`}
                key={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {/* If logged in, open menu, if not go to login */}
            {user?.accessToken
            && (
            <>
              <Tooltip title="Open settings">
                <IconButton aria-label="open settings" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ color: 'inherit', bgcolor: `${user?.settings?.color}` }}>
                    {user.username && user.username[0].toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flexWrap="wrap"
                  minHeight={50}
                  sx={{ px: 1, mb: 1 }}
                >
                  <Avatar sx={{ color: 'inherit', bgcolor: `${user?.settings?.color}` }}>
                    {user.username && user.username[0].toUpperCase()}
                  </Avatar>
                  <Box
                    alignItems="center"
                    sx={{ ml: 1.0 }}
                  >
                    <Typography
                      variant="body1"
                      textAlign="left"
                    >
                      {user.displayName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="left"
                    >
                      {`@${user.username}`}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.text}
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to={`/${setting.path}`}
                  >
                    <ListItemIcon sx={{ justifyContent: 'left' }}>
                      {setting.icon}
                    </ListItemIcon>
                    <Typography
                      key={setting.path}
                      textAlign="center"
                      variant="body1"
                      sx={{ color: 'inherit', display: 'block', textDecoration: 'none' }}
                    >
                      {setting.text}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
            )}
            {!user?.accessToken
            && (
            <Tooltip title="Sign In">
              <IconButton
                aria-label="sign in"
                component={Link}
                to="/login"
                sx={{ p: 0 }}
              >
                <Avatar sx={{ color: 'inherit' }} />
              </IconButton>
            </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
