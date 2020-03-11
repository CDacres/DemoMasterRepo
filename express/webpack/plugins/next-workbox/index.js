const path = require('path');
const fs = require('fs-extra');
const crypto = require('crypto');
const md5File = require('md5-file/promise').sync;
const findUp = require('find-up');
const { generateSWString, copyWorkboxLibraries, getModuleUrl } = require('workbox-build');

const hash = ctx => crypto.createHash('md5').update(ctx, 'utf8').digest('hex');

const defaultConfig = {
  globDirectory: './',
  globPatterns: [],
  clientsClaim: true,
  noop: false,
  skipWaiting: true,
  runtimeCaching: [{
    urlPattern: /^http[s|]?.*/,
    handler: 'staleWhileRevalidate'
  }],
  importScripts: [],
  distDir: '.next',
  importWorkboxFrom: 'local',
  precacheManifest: true,
  removeDir: true,
  buildId: null
};

class NextWorkbox {
  constructor(config) {
    const {
      distDir,
      importWorkboxFrom,
      noop,
      precacheManifest,
      removeDir,
      buildId,
      wamConfig,
      ...swConfig
    } = {
      ...defaultConfig,
      ...config,
      swDest: config.swDest ? path.basename(config.swDest) : 'sw.js',
      wamDest: config.wamDest ? path.basename(config.swDest) : 'manifest.json'
    };

    this.swConfig = swConfig;
    this.wamConfig = wamConfig;
    this.options = {
      distDir,
      importWorkboxFrom,
      precacheManifest,
      removeDir,
      buildId,
      noop,
      swDestRoot: './static/sw',
      swURLRoot: '/sw'
    };

    // build id come from next.js is exist
    if (!this.options.buildId) {
      throw Error('Build id from next.js must be exist');
    }

    // clean up previous builts
    if (this.options.removeDir) {
      this.removeWorkboxDir(this.options);
    }

    if (this.options.noop) {
      this.createSwDir(this.options);
    }
  }

  async importWorkboxLibraries({ swURLRoot, swDestRoot }) {
    if (this.options.importWorkboxFrom === 'local') {
      try {
        const workboxPkg = findUp.sync('node_modules/workbox-sw/package.json', __dirname);
        const workboxName = path.basename(require(workboxPkg).main);
        return `${swURLRoot}/${await copyWorkboxLibraries(swDestRoot)}/${workboxName}`;
      } catch (e) {
        throw Error(e);
      }
    } else {
      return getModuleUrl('workbox-sw');
    }
  }

  globPrecacheManifest({ distDir, buildId }) {
    const precacheQuery = [{
      src: `${distDir}/bundles/pages`,
      route: f => `/_next/${buildId}/page/${f}`,
      filter: f => (/.js$/).test(f)
    }, {
      src: `${distDir}/chunks`,
      route: f => `/_next/webpack/chunks/${f}`,
      filter: f => (/.js$/).test(f)
    }, {
      src: `${distDir}`,
      route: () => `/_next/${md5File(`${distDir}/app.js`)}/app.js`,
      filter: f => f === 'app.js'
    }];

    return Promise.all(precacheQuery.map(query => {
      return new Promise(resolve => {
        fs.readdir(query.src, (err, files = []) => {
          resolve(files.filter(query.filter).map(f => query.route(f)));
        });
      });
    })).then(files => files.reduce((c, p) => c.concat(p), []));
  }

  async importPrecacheManifest({ swDestRoot, swURLRoot }) {
    const manifest = await this.globPrecacheManifest(this.options);
    const context = `self.__precacheManifest = ${JSON.stringify(manifest)}`;
    const output = `next-precache-manifest-${hash(context)}.js`;

    // dump out precached manifest for next pages, chunks
    fs.writeFileSync(path.join(swDestRoot, output), context);

    return `${swURLRoot}/${output}`;
  }

  async generateNoopSW(swDest) {
    fs.writeFileSync(swDest, `
// A simple, no-op service worker that takes immediate control.

self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});
`);
  }

  async generateSW(swDest, swConfig) {
    const { swString } = await generateSWString(swConfig);
    fs.writeFileSync(swDest, swString);
  }

  async generateWebAppManifest(wamDest, wamConfig) {
    fs.writeFileSync(wamDest, JSON.stringify(wamConfig));
  }

  createSwDir({ swDestRoot }) {
    fs.mkdirSync(path.resolve(process.cwd(), swDestRoot));
  }

  removeWorkboxDir({ swDestRoot }) {
    fs.removeSync(path.resolve(process.cwd(), swDestRoot));
  }

  apply(compiler) {
    compiler.plugin('done', async stats => {
      if (stats.toJson().errors.length > 0) {
        return;
      }

      try {
        const { swDest, wamDest, ...swConfig } = this.swConfig;

        if (this.options.noop) {
          await this.generateNoopSW(path.join(this.options.swDestRoot, swDest), swConfig);
        } else {
          // unshift workbox libs to the top of scripts
          swConfig.importScripts.unshift(await this.importWorkboxLibraries(this.options));

          // push precached manifest to end of scripts
          if (this.options.precacheManifest) {
            swConfig.importScripts.push(await this.importPrecacheManifest(this.options));
          }

          await this.generateSW(path.join(this.options.swDestRoot, swDest), swConfig);
        }

        await this.generateWebAppManifest(path.join(this.options.swDestRoot, wamDest), this.wamConfig);
      } catch (e) {
        throw Error(e);
      }
    });
  }
}

module.exports = NextWorkbox;
