import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const SideDrawer = (props) => {
  return (
    <Drawer
        anchor='right'
        open={props.open}
        onClose={() => props.onClose(false)}
    >
        <List component = 'nav'>
            <ListItem button>
                Event Starts in
            </ListItem>

            <ListItem button>
                Event Info
            </ListItem>

            <ListItem button>
                Highlights
            </ListItem>

            <ListItem button>
                Pricing
            </ListItem>

            <ListItem button>
                Location
            </ListItem>
        
        </List>
    </Drawer>
  )
}

export default SideDrawer;
