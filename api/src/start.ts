import config from 'config';
import app from './server';
import Logger from './util/logger';

app.listen(config.get('port'), () => {
  Logger.info(`The application is listening on port ${config.get('port')}!`);
});
