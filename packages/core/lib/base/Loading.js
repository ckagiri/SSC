function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/styles'; // import MenuDownIcon from 'mdi-material-ui/MenuDown';
// import MenuUpIcon from 'mdi-material-ui/MenuUp';
// Input status: loading, error, resetable, isOpen, select

var useStyles = makeStyles(function (theme) {
  return {
    root: {
      position: 'relative',
      height: 2,
      marginTop: -2,
      width: '100%'
    },
    top: {
      position: 'absolute',
      top: 0,
      marginTop: 0
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
      marginTop: 0
    },
    color: {
      backgroundColor: theme.palette.grey['200']
    },
    barColor: {
      backgroundColor: theme.palette.action.disabled
    }
  };
});

var LoadingBar = function LoadingBar(_ref) {
  var position = _ref.position,
      color = _ref.color,
      props = _objectWithoutProperties(_ref, ["position", "color"]);

  var classes = useStyles(props);
  return React.createElement(LinearProgress, {
    color: color || 'primary',
    classes: {
      root: classNames(classes.root, position && classes[position], !color && classes.color),
      barColorPrimary: !color && classes.barColor
    }
  });
};

LoadingBar.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.oneOf(['primary', 'secondary']),
  position: PropTypes.oneOf(['top', 'bottom'])
};
export default LoadingBar;