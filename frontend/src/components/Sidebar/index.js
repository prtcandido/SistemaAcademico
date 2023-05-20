import { useState } from 'react';
import { styled } from '@mui/system';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Home, Delete, Menu, Close, Edit } from '@mui/icons-material';

const SidebarWrapper = styled(Drawer)`
  width: ${props => (props.open ? '240px' : '60px')};
  transition: width 0.2s;
  
  .MuiDrawer-paper {
    width: ${props => (props.open ? '240px' : '60px')};
    transition: width 0.2s;
    overflow-x: ${props => (props.open ? 'visible' : 'hidden')};
  }
`;

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <SidebarWrapper variant="permanent" anchor="left" open={open}>
      <IconButton onClick={toggleMenu}>
        {open ? <Close /> : <Menu />}
      </IconButton>
      <List>
        <ListItem button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary="Atualizar Calendario" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Deletar Periodo" />
        </ListItem>
      </List>
    </SidebarWrapper>
  );
};

export default Sidebar;
