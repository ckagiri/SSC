import React, { createElement, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme, withTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import LayoutContext from './LayoutContext';

export const useLayout = () => useContext(LayoutContext);

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
  },
  appFrame: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gridTemplateRows: 'auto auto 1fr',
    flexDirection: 'column',
    zIndex: 1,
    height: '100%',
    backgroundColor: theme.palette.background.default,
    position: 'relative',
    minWidth: 'fit-content',
    // width: '100%',
  },
  appBar: {
    gridColumnStart: 'span 3',
  },
  sidebar: {
    gridRowStart: 'span 2',
    height: '100%',
    // width: 'auto',
    backgroundColor: theme.palette.background.sidebar,
  },
  topbar: {
    gridColumnStart: 'span 2',
  },
  wrapper: {
    minHeight: '100%',
    overflow: 'scroll',
    backgroundColor: theme.palette.background.content,
  },
  content: {
    minHeight: '100%',
    overflow: 'hidden',
    // minHeight: 'fit-content',
  },
  supplement: {},
}));

const Layout = ({
  theme,
  appBar,
  topBar,
  children,
  supplement,
  sidebar,
  className,
  notification,
  title,
  hiddenAt,
  miniSidebar,
  ...props
}) => {
  const classes = useStyles(props);
  // const theme = useTheme(props);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMini, setSidebarMini] = useState(miniSidebar);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'));
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const width = xlUp ? 'xl' : lgUp ? 'lg' : mdUp ? 'md' : smUp ? 'sm' : 'xs';

  const state = {
    // Sidebar
    sidebarOpen,
    openSidebar,
    closeSidebar,
    collapse: () => setSidebarMini(true),
    expand: () => setSidebarMini(false),
    sidebarMini,

    theme,
    xlUp,
    lgUp,
    mdUp,
    smUp,
    width,
  };

  return (
    <LayoutContext.Provider value={state}>
      <div className={classnames(classes.root, className)}>
        <div className={classes.appFrame}>
          <header className={classes.appBar}>{appBar && appBar}</header>
          <nav className={classes.sidebar}>
            {sidebar && (
              <Hidden {...hiddenAt && { [hiddenAt]: true }}>
                {React.cloneElement(sidebar, {
                  variant: sidebarMini ? 'mini' : undefined,
                })}
              </Hidden>
            )}
          </nav>
          <div className={classes.topbar}>{topBar && topBar}</div>
          <div className={classes.content}>{children}</div>
          <div className={classes.supplement}>{supplement && supplement}</div>
        </div>
        {sidebar && (
          <Drawer
            // container={this.props.container}
            variant="temporary"
            open={sidebarOpen}
            onClose={closeSidebar}
          >
            {sidebar}
          </Drawer>
        )}
      </div>
    </LayoutContext.Provider>
  );
};

const componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.node]);

Layout.propTypes = {
  appBar: componentPropType,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  classes: PropTypes.object,
  className: PropTypes.string,
  error: componentPropType,
  notification: componentPropType,
  sidebar: componentPropType,
  supplement: componentPropType,
  title: PropTypes.string,
  topBar: componentPropType,
};

Layout.defaultProps = {
  // appBar: AppBar,
  // error: Error,
  // menu: Menu,
  // notification: Notification,
  // sidebar: Sidebar,
};

export default withTheme(Layout);
