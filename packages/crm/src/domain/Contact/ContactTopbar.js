import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { useLayout, Header } from '@ssc/core';
import { IconButton } from '@material-ui/core';
import SearchIcon from 'mdi-material-ui/Magnify';
import MenuIcon from 'mdi-material-ui/Menu';

const ContactTopbar = ({ contact = {}, title, router }) => {
  const { openSidebar, lgUp } = useLayout();
  const handleSearch = e => {
    e.preventDefault();
    router.push('/search');
  };
  return (
    <Header
      titleColor="primary"
      icon={
        !lgUp && (
          <IconButton onClick={openSidebar}>
            <MenuIcon />
          </IconButton>
        )
      }
      action={
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      }
      title={(contact && contact.fullName) || title}
      subheader={contact && contact.phone}
    />
  );
};

export default createFragmentContainer(
  ContactTopbar,
  graphql`
    fragment ContactTopbar_contact on Contact {
      fullName
      phone
    }
  `,
);
