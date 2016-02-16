import app from './app';

let debug = require('debug');
debug = debug('test-api');

app.set('port', 3001);

const server = app.listen(app.get('port'), () => {
  console.log('MOCK API'); //eslint-disable-line no-console
});
