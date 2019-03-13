// A hook that logs service method before, after and error
const logger = require('winston');

module.exports = function(text) {
  return function(hook) {
    let message = `${hook.type}: ${hook.path} - Method: ${hook.method}`;

    if (hook.type === 'error') {
      message += `: ${hook.error.message}`;
    }

    logger.info(message);
    logger.info('hook.data', hook.data);
    logger.info('hook.params', hook.params);
    logger.debug('hook.method', hook.method);

    if (hook.result) {
      logger.debug('hook.result', hook.result);
    }

    if (hook.error) {
      logger.error(hook.error);
    }
  };
};
