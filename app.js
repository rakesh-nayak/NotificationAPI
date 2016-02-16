import routes from './routes';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.set('json spaces', 2);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('(/api)?/', routes);

app.use((req, res, next) => {
  debugger;
  var err;
  err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  return res.json({
    error: err.message,
    detail: err
  });
});

export default app;
