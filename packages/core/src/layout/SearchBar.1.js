import React, { useState } from 'react';
import MenuIcon from 'mdi-material-ui/Menu';
import AddIcon from 'mdi-material-ui/Plus';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { omit } from 'lodash';

import AdornmentIcon from '../base/AdornmentIcon';
import AutoComplete from '../inputs/AutocompleteInput';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    border: 'none',
    height: 40,
    margin: 0,
  },
  notchedOutline: {
    border: 'none',
  },
  paper: {
    paddingTop: 4,
    paddingBottom: 4,
  },
}));

const SearchBar = ({ onMenu, onAdd, ...props }) => {
  const [focus, setFocus] = useState(false);
  const classes = useStyles(props);
  return (
    <div>
      <Paper
        className={classes.paper}
        elevation={focus ? 2 : 0}
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        <AutoComplete
          elevation={1}
          variant="outlined"
          margin="none"
          placeholder="Search"
          classes={omit(classes, 'paper')}
          select={false}
          startAdornment={
            <AdornmentIcon position="start" variant="outlined" icon={MenuIcon} onClick={onMenu} />
          }
          endAdornment={
            <AdornmentIcon position="end" variant="outlined" icon={AddIcon} onClick={onAdd} />
          }
          {...props}
        />
      </Paper>
    </div>
  );
};

export default SearchBar;
