import React from 'react';
import classNames from 'classnames';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { SidebarItem } from '@ssc/core';
import PersonIcon from 'mdi-material-ui/Account';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    // height: 128,
    overflow: 'hidden',
  },
}));

const ConsultantHeader = ({ consultant, className, ...props }) => {
  const classes = useStyles(props);
  const { shortName } = consultant || {};
  return (
    <div className={classNames(classes.root, className)}>
      <SidebarItem title={shortName} Icon={PersonIcon} />
    </div>
  );
};

export default createFragmentContainer(
  ConsultantHeader,
  graphql`
    fragment ConsultantHeader_consultant on Contact {
      shortName
    }
  `,
);
