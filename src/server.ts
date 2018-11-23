// Path Aliasing
import moduleAlias from 'module-alias';
moduleAlias.addAliases({
  '@controllers': `${__dirname}/controllers`,
  '@configs': `${__dirname}/configs/index`,
  '@utils': `${__dirname}/utils/index`,
  '@middlewares': `${__dirname}/middlewares/index`,
  '@models/postgres': `${__dirname}/models/postgres/index`,
  '@models/mongo': `${__dirname}/models/mongodb/index`,
  '@joiSchema': `${__dirname}/JoiSchema`,
  '@joiSchema/postgres': `${__dirname}/JoiSchema/postgres/index`,
});

import { app } from './app';
import { logger } from '@utils';

const server = app.listen(app.get('port'), () => {
  logger.info(
    `API Server running at http://localhost:${app.get('port')} (${app.get(
      'env',
    )})`,
  );
  logger.info('Press CTRL-C to stop\n');
});

export default server;
