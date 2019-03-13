import React from 'react';
import { BaseItem } from '@ssc/core';
import { makeStyles } from '@material-ui/styles';
import { get } from 'lodash';

const useStyles = makeStyles({
  root: {
    paddingRight: 0,
  },
  row: {
    width: '100%',
    display: 'flex',
  },
  main: {
    flex: '1 auto',
  },
  supplement: {
    paddingLeft: 16,
  },
});
const ContactListItem = ({
  contact: { fullName, phone, category, position, consultant, addresses },
  ...props
}) => {
  const classes = useStyles(props);
  const item = {
    primary: (
      <span className={classes.row}>
        <span className={classes.main}>{fullName}</span>
        <span className={classes.supplement}>{phone}</span>
      </span>
    ),
  };

  switch (category) {
    case 'Distributor':
      item.secondary = 'Nhà tư vấn';
      item.color = 'secondary';
      break;
    case 'Staff':
      item.secondary = (position && position.title) || 'Nhân viên';
      item.color = 'primary';
      break;
    default:
      item.secondary = (
        <span className={classes.row}>
          <span className={classes.main}>
            {(consultant && consultant.shortName) || 'Chưa chăm sóc'}
          </span>
          {get(addresses, '0.city') && (
            <span>
              {get(addresses, '0.town')
                ? `${get(addresses, '0.town')}, ${get(addresses, '0.city')}`
                : get(addresses, '0.city')}
            </span>
          )}
        </span>
      );
  }
  return <BaseItem item={item} classes={{ root: classes.root }} {...props} />;
};

ContactListItem.defaultProps = {
  contact: {},
};

export default ContactListItem;
