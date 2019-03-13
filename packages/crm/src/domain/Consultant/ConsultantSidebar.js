import React from 'react';
import classNames from 'classnames';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Sidebar, SidebarItem, useLayout } from '@ssc/core';
import { get } from 'lodash';
import InboxIcon from 'mdi-material-ui/Inbox';
import TodayIcon from 'mdi-material-ui/Star';
import CallIcon from 'mdi-material-ui/Phone';
import ScheduleIcon from 'mdi-material-ui/Calendar';
import FavoriteIcon from 'mdi-material-ui/Heart';
import CustomerIcon from 'mdi-material-ui/BriefcaseAccount';
import OutboxIcon from 'mdi-material-ui/Send';
import RightIcon from 'mdi-material-ui/ChevronRight';
import LeftIcon from 'mdi-material-ui/ChevronLeft';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Divider } from '@material-ui/core';

import Link from '../../components/Link';

const sidebarWidth = 240;
const minWidth = 56;

const useStyles = makeStyles(theme => ({
  inbox: {
    color: theme.palette.colors.extreme,
  },
  today: {
    color: theme.palette.colors.high,
  },
  call: {
    color: theme.palette.colors.low,
  },
  schedule: {
    color: theme.palette.colors.normal,
  },
  favorite: {
    color: theme.palette.secondary.light,
  },
  outbox: {
    color: theme.palette.colors.notice,
  },
  item: {
    minWidth: sidebarWidth,
  },
  bottomIcon: {
    margin: 4,
  },
  searchBar: {
    padding: 8,
    // backgroundColor: theme.palette.primary.main,
  },
  searchIcon: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 4,
    marginRight: 4,
  },
  root: {
    // backgroundColor: theme.sidebar.background,
    // zIndex: theme.zIndex.sidebar,
    width: sidebarWidth,
  },
  mini: {
    width: minWidth,
  },
}));

const ConsultantSidebar = ({ consultant, variant, className, mini, ...props }) => {
  const { collapse, expand, lgUp } = useLayout();

  const classes = useStyles(props);
  const links = [
    {
      to: 'inbox',
      title: 'Yêu cầu',
      icon: InboxIcon,
      count: get(consultant, 'inbox.totalCount', 0),
    },
    {
      to: 'today',
      title: 'Hôm nay',
      icon: TodayIcon,
      count: get(consultant, 'today.totalCount', 0),
    },
    {
      to: 'call',
      title: 'Cần gọi',
      icon: CallIcon,
      count: get(consultant, 'call.totalCount', 0),
    },
    {
      to: 'schedule',
      title: 'Lịch hẹn',
      icon: ScheduleIcon,
      count: get(consultant, 'schedule.totalCount', 0),
    },
    {
      to: 'favorite',
      title: 'Thân thiết',
      icon: FavoriteIcon,
      count: get(consultant, 'favorite.totalCount', 0),
    },
    {
      to: 'outbox',
      title: 'Đã chuyển',
      icon: OutboxIcon,
      count: get(consultant, 'outbox.totalCount', 0),
    },
    {
      to: 'customers',
      title: 'Khách hàng',
      icon: CustomerIcon,
      count: get(consultant, 'customers.totalCount', 0),
      class: classes.customers,
    },
  ];
  return (
    <Sidebar
      variant={variant}
      className={classNames(classes.root, classNames, { [classes.mini]: variant === 'mini' })}
      // top={
      //   variant !== 'mini' ? (
      //     <div className={classes.searchBar}>
      //       <ContactSearch
      //         Autocomplete={SearchBar}
      //         itemToString={() => null}
      //         onSelect={item =>
      //           get(item, 'node.phone') && props.router.push(`/${get(item, 'node.phone')}`)
      //         }
      //         {...props}
      //       />
      //     </div>
      //   ) : (
      //     <IconButton className={classes.searchIcon} onClick={() => expande()}>
      //       <SearchIcon />
      //     </IconButton>
      //   )
      // }
      content={
        <React.Fragment>
          {links.map((link, i) => (
            <Link to={`/${link.to}`} key={i}>
              <SidebarItem
                variant={variant}
                title={link.title}
                Icon={link.icon}
                badge={link.count}
                className={classes.item}
                classes={{ icon: classes[link.to] }}
                SecondaryIcon={!!link.count && RightIcon}
              />
            </Link>
          ))}
        </React.Fragment>
      }
      bottom={
        lgUp && (
          <div>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1 }} />
              <IconButton
                className={classes.bottomIcon}
                onClick={() => (variant === 'mini' ? expand() : collapse())}
              >
                {variant === 'mini' ? <RightIcon /> : <LeftIcon />}
              </IconButton>
            </div>
          </div>
        )
      }
    />
  );
};

export default createFragmentContainer(
  ConsultantSidebar,
  graphql`
    fragment ConsultantSidebar_consultant on Contact {
      ...ConsultantHeader_consultant
      ... on Staff {
        inbox {
          totalCount
        }
        today {
          totalCount
        }
        call {
          totalCount
        }
        schedule {
          totalCount
        }
        favorite {
          totalCount
        }
        customers {
          totalCount
        }
        outbox {
          totalCount
        }
      }
    }
  `,
);
