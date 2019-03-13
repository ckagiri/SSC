import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Divider,
  ListSubheader,
} from '@material-ui/core';

const BaseItem = ({ item, button, ...props }) => {
  switch (item.variant) {
    case 'subheader':
      return (
        <ListSubheader color={item.color} {...props}>
          {item.primary}
        </ListSubheader>
      );
    case 'divider':
      return <Divider />;
    default:
      return (
        <ListItem button={button} onClick={props.onMouseDown} {...props}>
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          {item.avatar && <ListItemAvatar>{item.avatar}</ListItemAvatar>}
          <ListItemText
            primary={item.primary}
            secondary={item.secondary}
            primaryTypographyProps={{ color: item.color }}
          />
        </ListItem>
      );
  }
};

BaseItem.defaultProps = {
  button: true,
};

export default BaseItem;
