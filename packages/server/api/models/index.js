import path from 'path';
import makeDebug from 'debug';
import pluralize from 'pluralize';
import R from 'ramda';
import load from '../bin/load';

const debug = makeDebug('models');

export default function() {
  const app = this;
  pluralize.addIrregularRule('staff', 'staffs');
  debug('Start models loading.');
  app.models = load(app, path.relative(path.normalize('.'), __dirname), 'model');
  debug('Finished models loading');
  // const {processModel, getEnums}= processModelDefinition(models);
  // console.log(JSON.stringify(app.models.consultant.definition, null, 2));
}
