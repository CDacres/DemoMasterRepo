/* eslint-disable no-console */
const express = require('express');
const nextJs = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
// const morgan = require('morgan');
const path = require('path');
const signale = require('signale');

// Router
const router = require('../dist/routes/router').default;

process.on('unhandledRejection', err => {
  throw err;
});

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = nextJs({ dev, dir: path.resolve(__dirname, '..', 'src') });
const handle = app.getRequestHandler();
const renderAndCache = require('./render_and_cache')(app);

const startServer = async () => {
  const server = express();

  server.use(helmet());
  server.use(compression());

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());

  // server.use(morgan('combined'));

  // Bugsnag stuff
  if (!dev) {
    const bugsnag = require('bugsnag');

    bugsnag.register(process.env.BUGSNAG_SERVER_KEY);

    server.use(bugsnag.requestHandler);
    server.use(bugsnag.errorHandler);
  }

  // PWA static route
  server.use(express.static(path.resolve(__dirname, '..', 'static/sw')));

  // Static folder static route
  server.use(express.static(path.resolve(__dirname, '..', 'static')));

  // Build folder static route
  server.use(express.static(path.resolve(__dirname, '..', 'build')));

  // Static files and next stuff
  server.get(/^\/(vendor|_next|sw|_express)\/*/, (req, res) => {
    return handle(req, res);
  });

  // Attach the router
  server.use('/([a-zA-Z]{2})?', router(app, dev, renderAndCache));
  server.use('/', router(app, dev, renderAndCache));

  await app.prepare();

  server.listen(port, error => {
    if (error) {
      return signale.fatal(new Error(error));
    }
    signale.success(`Server listening on ${port}...`);
  });
};

startServer();
