import React, { useState } from 'react';
import { createFragmentContainer } from 'react-relay';
import {
  withMutation,
  Content,
  // Debug
} from '@ssc/core';
import graphql from 'babel-plugin-relay/macro';
import { Card, CardContent, CardActions, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import PersonTabs from '../Person/PersonTabs';
import PersonPreInput from '../Person/PersonPreInput';
import AppointmentPreInput from '../Appointment/AppointmentPreInput';

const useStyles = makeStyles(theme => ({
  tabs: {
    // paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
  divider: {
    marginTop: -2,
    // position: 'absolute',
    // top: 120,
  },
}));

const Preconsultation = ({ customer, ...props }) => {
  const classes = useStyles(props);
  const [currentPerson, setCurrentPerson] = useState(0);
  return (
    <Content>
      <Card>
        <div>
          <PersonTabs
            className={classes.tabs}
            name="persons"
            currentPerson={currentPerson}
            onChange={setCurrentPerson}
          />
          <Divider className={classes.divider} />
        </div>

        <CardContent>
          <PersonPreInput name={`persons.${currentPerson}`} />
        </CardContent>
      </Card>

      <CardContent>
        <AppointmentPreInput />
      </CardContent>
      <CardActions>
        <Button type="submit" color="primary">
          Phân Chuyên viên
        </Button>
      </CardActions>
    </Content>
  );
};

export default createFragmentContainer(
  withMutation({
    mapPropsToValues: props => (props && props.customer) || {},
  })(Preconsultation),
  graphql`
    fragment Preconsultation_customer on Customer {
      id
      persons {
        name
      }
    }
  `,
);
