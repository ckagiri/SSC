import R from 'ramda';
import DataLoader from 'dataloader';
// eslint-disable-next-line
import { log } from './bin/helpers';

module.exports = function dataloader() {
  const app = this;
  app.use((req, res, next) => {
    req.feathers.loaders = R.pipe(
      R.filter(R.prop('persistent')),
      R.map(
        entity =>
          new DataLoader(
            keys =>
              entity.find(
                Object.assign({}, req.feathers, {
                  query: {
                    [entity.id]: { $in: R.uniq(keys) },
                  },
                }),
              ),
            { cacheKeyFn: key => key.toString() },
          ),
      ),
    )(app.entities);
    next();
  });
};
