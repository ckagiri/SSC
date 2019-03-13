function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { useFormikContext as useFormContext, getIn, withFormik } from 'formik'; // const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

export var useForm = function useForm(_ref) {
  var name = _ref.name,
      parent = _ref.parent,
      onSubmit = _ref.onSubmit,
      onReset = _ref.onReset,
      validate = _ref.validate,
      validateSchema = _ref.validateSchema,
      initialValues = _ref.initialValues,
      values = _ref.values,
      rest = _objectWithoutProperties(_ref, ["name", "parent", "onSubmit", "onReset", "validate", "validateSchema", "initialValues", "values"]);

  var form = useFormContext();

  form.getFieldValue = function (fieldName) {
    return getIn(form.values, fieldName);
  }; // const validateFunc =
  //   validate ||
  //   (validateSchema &&
  //     (val =>
  //       validateSchema
  //         .validate(val)
  //         .then(() => null)
  //         .catch(err => err.message))) ||
  //   (() => null);
  // const formChange = val => {
  //   form.setFieldValue(name, val);
  //   form.setTouched({ [name]: true });
  // };


  return _objectSpread({
    name: parent ? "".concat(parent, ".").concat(name) : name,
    value: name && getIn(form.values, name, '') || values,
    // onChange: name && callAll(formChange, onChange),
    // onBlur: name && callAll(form.handleBlur, onBlur),
    // error: name && getIn(form.touched, name) && getIn(form.errors, name),
    // touched: getIn(form.touched, name),
    form: form
  }, rest);
};
export var withForm = function withForm(Component) {
  return withFormik({
    mapPropsToValues: function mapPropsToValues(props) {
      return props && (props.mapPropsToValues ? props.mapPropsToValues(props) : props.value || {});
    }
  })(function (_ref2) {
    var dirty = _ref2.dirty,
        errors = _ref2.errors,
        getFieldProps = _ref2.getFieldProps,
        handleBlur = _ref2.handleBlur,
        handleChange = _ref2.handleChange,
        handleReset = _ref2.handleReset,
        handleSubmit = _ref2.handleSubmit,
        initialValues = _ref2.initialValues,
        isSubmitting = _ref2.isSubmitting,
        isValid = _ref2.isValid,
        isValidating = _ref2.isValidating,
        registerField = _ref2.registerField,
        resetForm = _ref2.resetForm,
        setErrors = _ref2.setErrors,
        setFieldTouched = _ref2.setFieldTouched,
        setFieldValue = _ref2.setFieldValue,
        setStatus = _ref2.setStatus,
        setSubmitting = _ref2.setSubmitting,
        submitForm = _ref2.submitForm,
        setFieldError = _ref2.setFieldError,
        setFormikState = _ref2.setFormikState,
        setTouched = _ref2.setTouched,
        setValues = _ref2.setValues,
        submitCount = _ref2.submitCount,
        touched = _ref2.touched,
        unregisterField = _ref2.unregisterField,
        validateField = _ref2.validateField,
        validateForm = _ref2.validateForm,
        validateOnBlur = _ref2.validateOnBlur,
        validateOnChange = _ref2.validateOnChange,
        values = _ref2.values,
        props = _objectWithoutProperties(_ref2, ["dirty", "errors", "getFieldProps", "handleBlur", "handleChange", "handleReset", "handleSubmit", "initialValues", "isSubmitting", "isValid", "isValidating", "registerField", "resetForm", "setErrors", "setFieldTouched", "setFieldValue", "setStatus", "setSubmitting", "submitForm", "setFieldError", "setFormikState", "setTouched", "setValues", "submitCount", "touched", "unregisterField", "validateField", "validateForm", "validateOnBlur", "validateOnChange", "values"]);

    return React.createElement(Component, _extends({
      form: {
        dirty: dirty,
        errors: errors,
        getFieldProps: getFieldProps,
        handleBlur: handleBlur,
        handleChange: handleChange,
        handleReset: handleReset,
        handleSubmit: handleSubmit,
        initialValues: initialValues,
        isSubmitting: isSubmitting,
        isValid: isValid,
        isValidating: isValidating,
        registerField: registerField,
        resetForm: resetForm,
        setErrors: setErrors,
        setFieldError: setFieldError,
        setFieldTouched: setFieldTouched,
        setFieldValue: setFieldValue,
        setStatus: setStatus,
        setSubmitting: setSubmitting,
        submitForm: submitForm,
        setFormState: setFormikState,
        setTouched: setTouched,
        setValues: setValues,
        submitCount: submitCount,
        touched: touched,
        unregisterField: unregisterField,
        validateField: validateField,
        validateForm: validateForm,
        validateOnBlur: validateOnBlur,
        validateOnChange: validateOnChange,
        values: values
      }
    }, props));
  });
};