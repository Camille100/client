/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Typography,
  List,
  CssBaseline,
  Divider,
  Menu,
  MenuItem,
  Collapse,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import {
  Home,
  AccountCircle,
  ChevronLeft,
  ChevronRight,
  Event,
  PinDrop,
  Call,
  Info,
  ContactSupport,
  Person,
  Login,
  Logout,
  AppRegistration,
  ExpandLess,
  ExpandMore,
  AdminPanelSettings,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../logo_small_black.png';
import { logoutUser } from '../../redux/slices/userSlice';
import { logout } from '../../services/authServices';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
  height: '82px',
}));

const styles = {
  container: css`
    margin-bottom: 82px;
  `,
};

const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout().then((res) => {
      // console.log(res);
      if (res.status === 200) {
        localStorage.clear();
        dispatch(logoutUser(false));
        navigate('/');
      }
    });
  };
  return (
    <>
      <Box sx={styles.container}>
        <CssBaseline />
        <AppBar position="fixed" color="secondary" open={open}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '100%',
              alignItems: 'center',
            }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                <img
                  style={{
                    width: '100px',
                    margin: '10px 0px 10px 10px',
                  }}
                  src={logo}
                  alt="Logo"
                />
              </Typography>
            </div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleClick}
              edge="end"
              sx={{ justifySelf: 'end' }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {userState.loggedIn === false
                ? (
                  <div>
                    <MenuItem component={Link} to="/login" onClick={handleClose}>
                      <Login
                        sx={{ marginRight: '10px' }}
                        color="neutral"
                      />
                      Se connecter

                    </MenuItem>
                    <MenuItem component={Link} to="/register" onClick={handleClose}>
                      <AppRegistration
                        sx={{ marginRight: '10px' }}
                        color="neutral"
                      />
                      S&apos;inscrire

                    </MenuItem>
                  </div>
                )
                : (
                  <div>
                    <MenuItem
                      component={Link}
                      to="/myaccount"
                      onClick={handleClose}
                      // onClick={() => handleLogout()}
                    >
                      <Person
                        sx={{ marginRight: '10px' }}
                        color="neutral"
                      />
                      Mon compte
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      onClick={() => handleLogout()}
                    >
                      <Logout
                        sx={{ marginRight: '10px' }}
                        color="neutral"
                      />
                      Se déconnecter

                    </MenuItem>

                  </div>
                )}
              {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
              {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawer}>
              {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleDrawer} component={Link} to="/">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleDrawer} component={Link} to="/dumps">
                <ListItemIcon>
                  <PinDrop />
                </ListItemIcon>
                <ListItemText primary="Mes décharges" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleDrawer} component={Link} to="/blocked">
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText primary="Mes évènements" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleDrawer} component={Link} to="/">
                <ListItemIcon>
                  <Call />
                </ListItemIcon>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleDrawer} component={Link} to="/">
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="A propos" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleDrawer} component={Link} to="/">
                <ListItemIcon>
                  <ContactSupport />
                </ListItemIcon>
                <ListItemText primary="Assistance" />
              </ListItemButton>
            </ListItem>
            {userState.loggedIn && userState.role === 'admin'
            && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCollapse} component={Link} to="/">
                  <ListItemIcon>
                    <AdminPanelSettings />
                  </ListItemIcon>
                  <ListItemText primary="Admin" />
                  {collapse ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={collapse} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/admin/dumps/validatecleaning">
                    <ListItemText primary="Valider nettoyages" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/admin/dumps">
                    <ListItemText primary="Décharges" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/admin/events">
                    <ListItemText primary="Evènements" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/admin/users">
                    <ListItemText primary="Utilisateurs" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/admin/equipments">
                    <ListItemText primary="Equipements" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/admin/invites">
                    <ListItemText primary="Invitations" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/admin/notifications">
                    <ListItemText primary="Notifications" />
                  </ListItemButton>
                </List>
              </Collapse>

            </>
            )}
          </List>
        </Drawer>
      </Box>
      <Outlet />
    </>
  );
};

export default Layout;
