import express from 'express';
import routes from './index';

const router = express.Router();

export default (app, dev, renderAndCache) => {
  routes.routes.forEach(routeObj => {
    router.get(new RegExp(routeObj.regExp), (req, res) => {
      const { _: footer, __: header, ...route } = routeObj;
      const query = {
        dev,
        route,
        params: req.params,
      };
      return renderAndCache(req, res, routeObj.filePath, query);
    });
  });

  router.get('*', (req, res) => {
    return renderAndCache(req, res, '/404', {
      dev,
    });
  });

  return router;
};
