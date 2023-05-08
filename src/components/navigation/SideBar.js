import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home'
import ApiIcon from '@mui/icons-material/Api';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import GroupsIcon from '@mui/icons-material/Groups';

export default function TemporaryDrawer(props) {
  const [state, toggleDrawer] = [props.state,props.toggleDrawer];
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
       
          <ListItem key={'Home'} disablePadding>
            <ListItemButton href={'home'}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Acceuil' />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Projets'} disablePadding>
            <ListItemButton href={'projets'}>
              <ListItemIcon>
                <WysiwygIcon />
              </ListItemIcon>
              <ListItemText primary='Projets' />
            </ListItemButton>
          </ListItem>
          <ListItem key={'DetailsProjet'} disablePadding>
            <ListItemButton href={'detailsProjet'}>
              <ListItemIcon>
                <ApiIcon />
              </ListItemIcon>
              <ListItemText primary='Details Projet' />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Devs'} disablePadding>
            <ListItemButton href={'devs'}>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary='Développeur' />
            </ListItemButton>
          </ListItem>
        
      </List>
      <Divider />
      
    </Box>
  );

  return (
    <div>
      
        <React.Fragment>
          <Drawer
           
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
      
    </div>
  );
}