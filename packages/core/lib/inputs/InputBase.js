function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useRef } from 'react';
import classNames from 'classnames';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import MuiInput from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import ClearIcon from 'mdi-material-ui/Close';
import MenuOpenIcon from 'mdi-material-ui/ChevronDown';
import MenuCloseIcon from 'mdi-material-ui/ChevronUp';
import { makeStyles } from '@material-ui/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AdornmentIcon from '../base/AdornmentIcon';
import LoadingIcon from '../base/LoadingIcon';
import Loading from '../base/Loading';
import useControlProp from '../uses/useControlProp';
import useToggle from '../uses/useToggle';
var useStyles = makeStyles({
  root: {
    marginTop: 6,
    marginBottom: 15
  },
  helperText: {
    marginTop: 6,
    marginBottom: -18
  },
  input: {
    paddingBottom: 5
  },
  end: {
    marginLeft: 8
  },
  notchedOutline: {},
  multiline: {
    paddingTop: 2,
    paddingBottom: 1,
    lineHeight: 1.25
  }
});
var variantComponent = {
  standard: MuiInput,
  filled: FilledInput,
  outlined: OutlinedInput
};

var Input = function Input(_ref) {
  var disabled = _ref.disabled,
      error = _ref.error,
      focusOnClear = _ref.focusOnClear,
      id = _ref.id,
      required = _ref.required,
      resetable = _ref.resetable,
      value = _ref.value,
      variant = _ref.variant,
      className = _ref.className,
      fullWidth = _ref.fullWidth,
      margin = _ref.margin,
      label = _ref.label,
      InputLabelProps = _ref.InputLabelProps,
      inputProps = _ref.inputProps,
      loading = _ref.loading,
      LoadingProps = _ref.LoadingProps,
      helperText = _ref.helperText,
      getHelperText = _ref.getHelperText,
      HelperTextProps = _ref.HelperTextProps,
      select = _ref.select,
      isOpenProp = _ref.isOpen,
      openMenu = _ref.openMenu,
      closeMenu = _ref.closeMenu,
      children = _ref.children,
      SelectProps = _ref.SelectProps,
      InputProps = _ref.InputProps,
      inputComponent = _ref.inputComponent,
      endAdornmentProp = _ref.endAdornment,
      onValueChange = _ref.onValueChange,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      _onChange = _ref.onChange,
      onClear = _ref.onClear,
      _inputRef = _ref.inputRef,
      multiline = _ref.multiline,
      form = _ref.form,
      props = _objectWithoutProperties(_ref, ["disabled", "error", "focusOnClear", "id", "required", "resetable", "value", "variant", "className", "fullWidth", "margin", "label", "InputLabelProps", "inputProps", "loading", "LoadingProps", "helperText", "getHelperText", "HelperTextProps", "select", "isOpen", "openMenu", "closeMenu", "children", "SelectProps", "InputProps", "inputComponent", "endAdornment", "onValueChange", "onFocus", "onBlur", "onChange", "onClear", "inputRef", "multiline", "form"]);

  var labelRef = useRef();
  var inputNode = useRef();
  var classes = useStyles(props); // console.log('render');
  // const [value, setValue] = useControlProp(valueProp, onValueChange);

  var _useToggle = useToggle(isOpenProp, openMenu, closeMenu, false),
      _useToggle2 = _slicedToArray(_useToggle, 2),
      isOpen = _useToggle2[0],
      toggleMenu = _useToggle2[1];

  var _useToggle3 = useToggle(isOpenProp, onFocus, onBlur, false),
      _useToggle4 = _slicedToArray(_useToggle3, 4),
      isFocus = _useToggle4[0],
      toggleFocus = _useToggle4[1],
      handleFocus = _useToggle4[2],
      handleBlur = _useToggle4[3];

  var InputMore = {};

  if (variant === 'outlined') {
    if (InputLabelProps && typeof InputLabelProps.shrink !== 'undefined') {
      InputMore.notched = InputLabelProps.shrink;
    }

    InputMore.labelWidth = labelRef.current && labelRef.current.offsetWidth || 0;
  }

  var helper = getHelperText ? getHelperText({
    value: value,
    helperText: helperText
  }) : helperText;
  var helperTextId = helper && id ? "".concat(id, "-helper-text") : undefined;

  var handleClear = function handleClear(e) {
    e.preventDefault();
    if (onClear) onClear();

    if (focusOnClear && inputNode.current) {
      inputNode.current.focus();
    }
  };

  var ResetButton = function ResetButton(props) {
    return React.createElement(AdornmentIcon, _extends({
      position: "end",
      variant: variant,
      icon: ClearIcon,
      onMouseDown: handleClear
    }, props));
  };

  var MenuIcon = function MenuIcon(props) {
    return React.createElement(AdornmentIcon, _extends({
      position: "end",
      variant: "outlined",
      icon: isOpen ? MenuCloseIcon : MenuOpenIcon,
      onMouseDown: toggleMenu,
      onMouseUp: function onMouseUp(e) {
        if (isOpen && inputNode.current) {
          inputNode.current.focus();
        }
      }
    }, props));
  };

  var loadingIcon = !disabled && loading && variant === 'outlined' && React.createElement(InputAdornment, {
    position: "end"
  }, React.createElement(LoadingIcon, LoadingProps));
  var endAdornment = React.createElement(React.Fragment, null, loadingIcon, !disabled && !multiline && (resetable && value && (select || isFocus) ? React.createElement(ResetButton, null) : select && React.createElement(MenuIcon, null)), typeof endAdornmentProp === 'string' ? React.createElement(InputAdornment, {
    position: "end",
    className: classes.end
  }, endAdornmentProp) : endAdornmentProp);
  var InputComponent = variantComponent[variant];
  var InputElement = React.createElement(InputComponent, _extends({
    id: id,
    classes: {
      input: classes.input,
      multiline: classes.multiline
    },
    inputRef: function inputRef(input) {
      inputNode.current = input;
      if (_inputRef) _inputRef(input);
    },
    endAdornment: endAdornment,
    inputComponent: inputComponent,
    onChange: function onChange(e) {
      if (_onChange) _onChange(e);
      if (onValueChange) onValueChange(e.target.value);
    },
    onFocus: handleFocus,
    onBlur: handleBlur,
    inputProps: inputProps,
    multiline: multiline
  }, InputMore, InputProps, props, {
    value: value || ''
  }));
  return React.createElement(FormControl, {
    "aria-describedby": helperTextId,
    className: classNames(_defineProperty({}, classes.root, variant === 'standard'), className),
    error: !!error,
    fullWidth: fullWidth,
    required: required,
    variant: variant,
    disabled: disabled,
    margin: margin
  }, label && React.createElement(InputLabel, _extends({
    htmlFor: id,
    ref: labelRef
  }, InputLabelProps), label), select && children ? React.createElement(Select, _extends({
    value: value,
    input: InputElement
  }, SelectProps), children) : InputElement, !disabled && loading && variant !== 'outlined' && React.createElement(Loading, LoadingProps), (helper || error) && React.createElement(FormHelperText, _extends({
    id: helperTextId
  }, HelperTextProps, {
    className: classNames(_defineProperty({}, classes.helperText, variant === 'standard'))
  }), error || helper));
};

Input.propTypes = {
  /** button label. */
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  endAdornment: PropTypes.node,
  error: PropTypes.string,
  focusOnClear: PropTypes.bool,
  FormHelperTextProps: PropTypes.object,
  fullWidth: PropTypes.bool,
  getEndAdornment: PropTypes.func,
  getHelperText: PropTypes.func,
  helperText: PropTypes.node,
  id: PropTypes.string,
  InputLabelProps: PropTypes.object,
  InputProps: PropTypes.object,

  /**
   * Properties applied to the `Input` element.
   */
  inputProps: PropTypes.object,

  /**
   * Properties applied to the `Input` element.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Attributes applied to the native `input` element.
   */
  label: PropTypes.node,

  /**
   * Use that property to pass a ref callback to the native input component.
   */
  loading: PropTypes.bool,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  multiline: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  resetable: PropTypes.bool,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  select: PropTypes.bool,
  SelectProps: PropTypes.object,
  startAdornment: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))]),
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled'])
};
Input.defaultProps = {
  InputLabelProps: {},
  autoComplete: 'off',
  focusOnClear: true,
  required: false,
  resetable: true,
  select: false,
  variant: 'standard'
};
export default React.memo(Input); // export default React.memo(Input, (nextProps, prevProps) => {
//   _.forEach(nextProps, (v, k) => {
//     if (prevProps[k] !== v) {
//       console.log(nextProps.name, k, v, prevProps[k]);
//     }
//   });
//   return _.isEqual(nextProps, prevProps);
// });