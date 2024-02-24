import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { convertArrayToRecord, getNameColor } from '../../../helpers/common';
import { RootState, useAppDispatch } from '../../../store/store';
import stylesGlobal from '../../app.module.css';
import { openMenu } from '../../../store/reducers/common';

const Header = () => {
  const { users } = useSelector((state: RootState) => state.users);
  const { loadingMenu } = useSelector((state: RootState) => state.commons);
  const mapUsersList: Record<number, string> = convertArrayToRecord(users);
  const dispatch = useAppDispatch();
  const assigneeName = mapUsersList[1];
  const { name, color } = assigneeName
    ? getNameColor(assigneeName)
    : { name: '', color: '' };

  return (
    <Grid
      container
      className={stylesGlobal['navbar-top']}
      sx={{ position: 'sticky', top: 0, zIndex: 2 }}
    >
      <Grid item xs={12}>
        <AppBar position="sticky" className={stylesGlobal['navbar']}>
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => dispatch(openMenu(!loadingMenu))}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/dashboard"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>

              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
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
                LOGO
              </Typography>

              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
                <Tooltip title="Open settings">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar sx={{ width: 30, height: 30, bgcolor: color }}>
                      {name}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Grid>
    </Grid>
  );
};

export default Header;
