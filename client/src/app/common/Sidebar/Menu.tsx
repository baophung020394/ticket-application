import { Box, Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuType } from '../../../constants/type.common';
import styleGlobal from '../../app.module.css';

interface MenuProps {
  options: MenuType[];
}

const MenuSidebar: React.FC<MenuProps> = ({ options }) => {
  const location = useLocation();
  return (
    <Box className={`${styleGlobal['menu-sidebar']} `} width={'100%'}>
      <Grid item xs={12} sx={{ position: 'sticky', top: 0 }}>
        {options.map((option, index) => (
          <Link
            className={`${styleGlobal['menu-item']} ${
              option.link === location.pathname ? styleGlobal['active'] : ''
            }`}
            key={index}
            to={option.link}
          >
            <MenuItem>{option.label}</MenuItem>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default MenuSidebar;
