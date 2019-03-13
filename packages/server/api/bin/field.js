import R from 'ramda';
import _ from 'lodash';
import makeDebug from 'debug';
// import { remove as removeDiacritics } from 'diacritics';
// import { log } from './helpers';

const debug = makeDebug('field');
// const enums = {};

// Convery field from different formats to standard object format of {}
// field = 'Type' => basic field
// field =['Type']
// field =[] => empty enum
// field = ['value1', 'value2']
// @Output: field with format {}, type may be null for field enum
const parseField = field => {
  // Already in object format, no need to do any thing
  if (typeof field === 'object' && !R.is(Array, field)) return field;

  debug('process', field);
  // Basic field format
  if (typeof field === 'string') {
    return {
      type: field
    };
  }
  // field must be in array format
  if (!R.is(Array, field)) debug('Property is wrong format', field);

  // List type
  if (field.length === 1)
    return {
      type: field[0],
      isList: true
    };

  // Enum type
  return {
    enum: field
  };
};

const parseList = field =>
  Object.assign(
    {},
    field,
    typeof field.type === 'object' &&
      R.is(Array, field.type) &&
      field.type.length === 1 && {
      type: field.type[0],
      isList: true
    }
  );
// Convert enum value to object format
// @Output enum is array of {value, name,...}
const parseEnumValues = field =>
  Object.assign(
    {},
    field,
    field.enum && {
      enum: R.map(
        value =>
          field.prefix
            ? typeof value === 'object'
              ? Object.assign({}, value, {
                value: `${field.prefix}:${value.value}`
              })
              : {
                value: `${field.prefix}:${value}`,
                title: `${field.prefix}:${value}`
              }
            : typeof value === 'object'
              ? value
              : { value, title: value }
      )(field.enum)
    },
    field.enum && field.prefix && { type: 'String' }
  );

const isAttribute = (attr, regex) => field =>
  Object.assign(
    {},
    field,
    field.type &&
      field.type.match(regex) && {
      [attr]: true,
      type: field.type.replace(regex, '')
    }
  );

const getDefaultValue = field => {
  if (!field.default && field.type && field.type.search('=') > -1) {
    let value = field.type
      .substring(field.type.search('=') + 1, field.type.length)
      .trim();
    const type = field.type.substring(0, field.type.search('=') - 1).trim();

    switch (type.toLowerCase()) {
      case 'boolean':
        switch (value.toLowerCase()) {
          case 'false':
            value = false;
            break;
          case 'true':
            value = true;
            break;
          default:
        }
        break;
      case 'int':
      case 'float':
      case 'number':
        value = Number(value);
        break;
      default:
    }
    return Object.assign({}, field, {
      default: value,
      type
    });
  }
  return field;
};

// Add name to field, field must be Object format, set name to field type of name is absent
const setFieldName = name => field =>
  Object.assign({}, field, { name: name || field.type });

export const processField = R.curry((name, field) =>
  R.pipe(
    parseField,
    parseList,
    parseEnumValues,
    isAttribute('required', /!/),
    isAttribute('unique', /#/),
    isAttribute('search', /\?/),
    isAttribute('sortable', /\*/),
    isAttribute('referred', /@/),
    getDefaultValue,
    setFieldName(name)
  )(field)
);

const parseArgs = args =>
  typeof args === 'string' || R.is(Array, args)
    ? processField(_.lowerFirst(args), args)
    : R.mapObjIndexed((arg, name) => processField(name, arg))(args);

export const processArgs = field =>
  R.merge(field, field.args && { args: parseArgs(field.args) });

export const processReturn = field =>
  Object.assign({}, field, field.return && { return: parseArgs(field.return) });
