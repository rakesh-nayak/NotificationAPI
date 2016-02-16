import app from './app';

let debug = require('debug');
debug = debug('test-api');
var port = Number(process.env.PORT || 3001);
app.set('port', port);

const server = app.listen(app.get('port'), () => {
  console.log('MOCK API'); //eslint-disable-line no-console
});
