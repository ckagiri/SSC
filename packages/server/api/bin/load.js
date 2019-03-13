import path from 'path';
import fs from 'fs';
import _ from 'lodash';
// import R from 'ramda';
// import pluralize from 'pluralize';
// import { log } from './helpers';
import { makeDebug } from './helpers';
// import Model from './model';

const debug = makeDebug('models:load');

const filenameFn = (dir, name, type = 'definition') =>
  `${path.join(dir, name, name)}.${type}.js`;
const relativePathFn = (dir, name, type) =>
  `./${path.relative(__dirname, filenameFn(dir, name, type))}`;

export default function(app, directory, type) {
  const models = {};
  let Model;
  if (!Model) {
    try {
      // eslint-disable-next-line
      Model = require(`./${_.lowerFirst(type)}`).default;
    } catch (e) {
      return null;
    }
  }

  fs.readdirSync(directory).forEach(name => {
    let model;
    const options = {};
    // debug(name);
    try {
      // eslint-disable-next-line
      options.definition = require(relativePathFn(
        directory,
        name,
        'definition'
      )).default;
      options.hooks = require(relativePathFn(directory, name, 'hooks')); // eslint-disable-line
      options.filters = require(relativePathFn(directory, name, 'filters')); // eslint-disable-line
    } catch (e) {} // eslint-disable-line

    options.name = _.lowerFirst(options.name || name);

    if (fs.existsSync(filenameFn(directory, name, type))) {
      debug('custom model for', name);
      // eslint-disable-next-line
      const CustomModel = require(relativePathFn(directory, name, type))
        .default;
      model = new CustomModel(app, options);
    } else if (fs.existsSync(filenameFn(directory, name, 'definition'))) {
      debug('default model for', name);
      model = new Model(app, options);
    }

    if (model) {
      debug('register model for', name);
      model.name = options.name;
      models[options.name] = model;
    }
  });
  return models;
}
