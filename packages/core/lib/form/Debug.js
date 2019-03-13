function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { FormikConsumer } from 'formik';

var Debug = function Debug() {
  return React.createElement("div", {
    style: {
      margin: ' 0',
      borderRadius: 4,
      background: '#f6f8fa',
      boxShadow: '0 0 1px  #eee inset'
    }
  }, React.createElement("div", {
    style: {
      textTransform: 'uppercase',
      fontSize: 11,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      fontWeight: 500,
      padding: '.5rem',
      background: '#555',
      color: '#fff',
      letterSpacing: '1px'
    }
  }, "Formik State"), React.createElement(FormikConsumer, null, function (_ref) {
    var validationSchema = _ref.validationSchema,
        validate = _ref.validate,
        onSubmit = _ref.onSubmit,
        rest = _objectWithoutProperties(_ref, ["validationSchema", "validate", "onSubmit"]);

    return React.createElement("pre", {
      style: {
        fontSize: '.80rem',
        padding: '.25rem .5rem',
        overflowX: 'scroll'
      }
    }, JSON.stringify(rest, null, 2));
  }));
};

export default Debug;