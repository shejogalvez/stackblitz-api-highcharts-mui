import React, { FC } from 'react';

import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  MenuItem,
  Menu,
} from '@mui/material';

export const NavBar: FC<{ title: string; setColor: React.Dispatch<any> }> = ({
  title,
  setColor,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const colors = ['blue', 'red', 'cyan'];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Button color="inherit" onClick={handleOpen}>
          Change color
        </Button>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {colors.map((color: String) => (
            <MenuItem
              key={color}
              onClick={() => {
                handleClose();
                setColor(color);
              }}
            >
              <Typography textAlign="center">{color}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
