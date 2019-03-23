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

const useStyles = makeStyles({
  root: {
    marginTop: 6,
    marginBottom: 15,
  },
  helperText: {
    marginTop: 6,
    marginBottom: -18,
  },
  input: {
    paddingBottom: 5,
  },
  end: {
    marginLeft: 8,
  },
  notchedOutline: {},
  multiline: {
    paddingTop: 2,
    paddingBottom: 1,
    lineHeight: 1.25,
  },
});

const variantComponent = {
  standard: MuiInput,
  filled: FilledInput,
  outlined: OutlinedInput,
};

const Input = ({
  // Setting
  disabled,
  error,
  focusOnClear,
  id,
  required,
  resetable,
  value,
  variant,

  // FormControl
  className,
  fullWidth,
  margin,

  // Label
  label,
  // labelRef,
  InputLabelProps,
  inputProps,

  // loading
  loading,
  LoadingProps,

  // helperText
  helperText,
  getHelperText,
  HelperTextProps,

  // select
  select,
  isOpen: isOpenProp,
  openMenu,
  closeMenu,
  children,
  SelectProps,

  // Input
  InputProps,
  inputComponent,
  endAdornment: endAdornmentProp,
  onValueChange,
  onFocus,
  onBlur,
  onChange,
  onClear,
  inputRef,
  multiline,
  form,
  ...props
}) => {
  const labelRef = useRef();
  const inputNode = useRef();
  const classes = useStyles(props);
  // console.log('render');

  // const [value, setValue] = useControlProp(valueProp, onValueChange);
  const [isOpen, toggleMenu] = useToggle(isOpenProp, openMenu, closeMenu, false);
  const [isFocus, toggleFocus, handleFocus, handleBlur] = useToggle(
    isOpenProp,
    onFocus,
    onBlur,
    false,
  );

  const InputMore = {};
  if (variant === 'outlined') {
    if (InputLabelProps && typeof InputLabelProps.shrink !== 'undefined') {
      InputMore.notched = InputLabelProps.shrink;
    }
    InputMore.labelWidth = (labelRef.current && labelRef.current.offsetWidth) || 0;
  }

  const helper = getHelperText ? getHelperText({ value, helperText }) : helperText;
  const helperTextId = helper && id ? `${id}-helper-text` : undefined;

  const handleClear = e => {
    e.preventDefault();
    if (onClear) onClear();
    if (focusOnClear && inputNode.current) {
      inputNode.current.focus();
    }
  };

  const ResetButton = props => (
    <AdornmentIcon
      position="end"
      variant={variant}
      icon={ClearIcon}
      onMouseDown={handleClear}
      {...props}
    />
  );

  const MenuIcon = props => (
    <AdornmentIcon
      position="end"
      variant="outlined"
      icon={isOpen ? MenuCloseIcon : MenuOpenIcon}
      onMouseDown={toggleMenu}
      onMouseUp={e => {
        if (isOpen && inputNode.current) {
          inputNode.current.focus();
        }
      }}
      {...props}
    />
  );

  const loadingIcon = !disabled && loading && variant === 'outlined' && (
    <InputAdornment position="end">
      <LoadingIcon {...LoadingProps} />
    </InputAdornment>
  );
  const endAdornment = (
    <React.Fragment>
      {loadingIcon}
      {!disabled &&
        !multiline &&
        (resetable && value && (select || isFocus) ? <ResetButton /> : select && <MenuIcon />)}
      {typeof endAdornmentProp === 'string' ? (
        <InputAdornment position="end" className={classes.end}>
          {endAdornmentProp}
        </InputAdornment>
      ) : (
        endAdornmentProp
      )}
    </React.Fragment>
  );
  const InputComponent = variantComponent[variant];

  const InputElement = (
    <InputComponent
      id={id}
      classes={{ input: classes.input, multiline: classes.multiline }}
      inputRef={input => {
        inputNode.current = input;
        if (inputRef) inputRef(input);
      }}
      endAdornment={endAdornment}
      inputComponent={inputComponent}
      onChange={e => {
        if (onChange) onChange(e);
        if (onValueChange) onValueChange(e.target.value);
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      inputProps={inputProps}
      multiline={multiline}
      {...InputMore}
      {...InputProps}
      {...props}
      value={value || ''}
    />
  );

  return (
    <FormControl
      aria-describedby={helperTextId}
      className={classNames({ [classes.root]: variant === 'standard' }, className)}
      error={!!error}
      fullWidth={fullWidth}
      required={required}
      variant={variant}
      disabled={disabled}
      margin={margin}
    >
      {label && (
        <InputLabel htmlFor={id} ref={labelRef} {...InputLabelProps}>
          {label}
        </InputLabel>
      )}
      {select && children ? (
        <Select value={value} input={InputElement} {...SelectProps}>
          {children}
        </Select>
      ) : (
        InputElement
      )}
      {!disabled && loading && variant !== 'outlined' && <Loading {...LoadingProps} />}
      {(helper || error) && (
        <FormHelperText
          id={helperTextId}
          {...HelperTextProps}
          className={classNames({ [classes.helperText]: variant === 'standard' })}
        >
          {error || helper}
        </FormHelperText>
      )}
    </FormControl>
  );
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
  ]),
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

Input.defaultProps = {
  InputLabelProps: {},
  autoComplete: 'off',
  focusOnClear: true,
  required: false,
  resetable: true,
  select: false,
  variant: 'standard',
};

export default React.memo(Input);

// export default React.memo(Input, (nextProps, prevProps) => {
//   _.forEach(nextProps, (v, k) => {
//     if (prevProps[k] !== v) {
//       console.log(nextProps.name, k, v, prevProps[k]);
//     }
//   });
//   return _.isEqual(nextProps, prevProps);
// });
