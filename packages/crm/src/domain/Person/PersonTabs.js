import React from 'react';
import classNames from 'classnames';
import { Tabs, IconButton, ButtonBase } from '@material-ui/core';
import AddIcon from 'mdi-material-ui/AccountPlus';
import { useLayout, connectArray, Typography } from '@ssc/core';
import RemoveIcon from 'mdi-material-ui/Close';
import { makeStyles } from '@material-ui/styles';
import { get } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  tabs: {
    flex: 1,
  },
  addIcon: { marginRight: -theme.spacing(1) },
}));

const useTabStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    minWidth: 160,
  },
  label: {
    flex: 1,
    justifyContent: 'left',
    paddingRight: theme.spacing(1),
    textTransform: 'capitalize',
  },
  iconButton: {
    padding: 0,
    marginTop: 5,
    height: 18,
  },
  icon: {
    // position: 'absolute',
    // right: theme.spacing(0.5),
    fontSize: 18,
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.divider,
    borderRadius: '50%',
  },
}));

const PersonTab = ({ person, value, onChange, onRemove, ...props }) => {
  const classes = useTabStyles(props);
  return (
    <div className={classes.root}>
      <ButtonBase disableRipple className={classes.label} onClick={e => onChange(e, value)}>
        <Typography variant="subtitle1">
          {person && person.name ? person.name : 'Người dùng'}
        </Typography>
      </ButtonBase>
      <IconButton
        className={classes.iconButton}
        onClick={e => {
          onRemove(e, value);
        }}
      >
        <RemoveIcon className={classes.icon} />
      </IconButton>
    </div>
  );
};

const PersonTabs = ({
  className,
  currentPerson = 0,
  onChange,
  value,
  arrayHelpers: { push, remove },
  ...props
}) => {
  const classes = useStyles(props);
  const { mdUp } = useLayout();
  const handleRemove = (e, index) => {
    e.preventDefault();
    onChange(index > 0 ? index - 1 : 0);
    remove(index);
  };
  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.tabs}>
        <Tabs
          value={currentPerson}
          onChange={(e, v) => {
            if (onChange) onChange(v);
          }}
          variant={mdUp ? 'standard' : 'fullWidth'}
        >
          {((value && value.length !== 0 && value) || [{}]).map((person, index) => (
            <PersonTab person={person} key={index} onRemove={handleRemove} />
          ))}
        </Tabs>
      </div>

      <IconButton
        className={classes.addIcon}
        onClick={() => {
          push({});
          if (onChange) onChange(value.length);
        }}
        color="secondary"
        disabled={!get(value, `${value && value.length ? value.length - 1 : 0}.name`)}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default connectArray(PersonTabs);
