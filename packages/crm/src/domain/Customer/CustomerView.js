import React from 'react';
import classNames from 'classnames';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { makeStyles } from '@material-ui/styles';

import CustomerHeader from './CustomerHeader';
import ConsultantField from '../Consultant/ConsultantField';
import ContactField from '../Contact/ContactField';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridAutoFlow: 'column',
    [theme.breakpoints.down('sm')]: {
      gridAutoFlow: 'row',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: 'repeat(4, 1fr)',
    },
  },
  header: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  content: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  backIcon: {
    padding: 6,
  },
}));

const CustomerView = ({ customer, router, className, ...props }) => {
  const classes = useStyles(props);
  const { introducedBy, teleconsultant, preconsultant, consultant } = customer;
  return (
    <div className={classNames(classes.root, className)}>
      <CustomerHeader customer={customer} />
      <ContactField contact={introducedBy} label="Giới thiệu" variant="body1" color="primary" />
      <ConsultantField
        consultant={consultant}
        label="Chuyên viên"
        variant="body1"
        color="secondary"
      />
      <ConsultantField consultant={teleconsultant} label="Sơ bộ" variant="body1" />
      <ConsultantField consultant={preconsultant} label="Tư vấn" variant="body1" />
    </div>
  );
};

export default createFragmentContainer(
  CustomerView,
  graphql`
    fragment CustomerView_customer on Contact {
      phone
      ...CustomerHeader_customer
      ... on Customer {
        introducedBy {
          fullName
          phone
        }
        teleconsultant {
          shortName
        }
        preconsultant {
          shortName
        }
        consultant {
          shortName
        }
      }
    }
  `,
);
