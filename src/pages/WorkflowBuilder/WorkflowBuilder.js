import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DS_functions from '../../DataSource/DS_functions';
const drawerWidth = 240;

export default function WorkflowBuilder() {
    const [canvasFunctions, setCanvasFunctions] = React.useState([]);   
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <Typography variant="h6" noWrap component="div">Browser</Typography>
          <List>
            {DS_functions.map((func, index) => (
              <ListItem key={func.id} disablePadding draggable>
                <ListItemButton >
                  <ListItemIcon >
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={func.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
            <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <canvas id="canvas" width="1000" height="1000" style={{border:"1px solid #000000"}}></canvas>
      </Box>
    </Box>
  );
}