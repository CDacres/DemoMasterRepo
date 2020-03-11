require('babel-register');
require('dotenv').config();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Rapscallion = require('rapscallion');
var FreactalServer = require('freactal/lib/server');
var thunkMiddleware = require('redux-thunk').default;
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var Redux = require('redux');
var ReactRedux = require('react-redux');
// var redis = require('redis');

var app = express();
var server = http.createServer(app);

const config = {
    apiUrl: `${process.env.DATA_API_URL}api/`,
    acceptHeader: `application/vnd.zip_api.${process.env.DATA_API_VERSION}+json`
}

// var client = redis.createClient();

// client.on('error', function (err) {
//     console.log('Error: ' + err);
// });

// Sockets for Realtime Data
// var io = require('socket.io')(server);
// var urls = {};
// io.sockets.on('connection', function(socket) {
//     socket.on('pageview', function(url) {
//         socket.url = url;
//         console.log(socket.url);
//         if (urls[url]) {
//             urls[url] += 1;
//         } else {
//             urls[url] = 1;
//         }
//         io.sockets.emit('change', { url, count: urls[url] });
//     });
//     socket.on('disconnect', () => {
//         urls[socket.url] -= 1;
//         io.sockets.emit('change', { url: socket.url, count: urls[socket.url] });
//     });
// });

// React renderToString Service
app.use(bodyParser.json());
// app.use('/render', function (req, res) {
//     try {
//         var view = '../src/' + req.body.path + req.body.component;
//         var component = require(view).default;
//         var props = req.body.props || null;
//         FreactalServer.initialize(React.createElement(component, props))
//             .then(function (response) {
//                 var html = ReactDOMServer.renderToString(response.vdom);
//                 res.status(200).send(`
//                     <div id="${req.body.component}-root">${html}</div>
//                     <script>var props = ${JSON.stringify(props)}</script>
//                     <script>window.__state__ = ${JSON.stringify(response.state[0])}</script>
//                 `);
//             });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err.message);
//     }
// });

app.use('/', (req, res) => {
    res.status(200).send('Monkey');
});

app.use('/render-freactal', function (req, res) {
    try {
        var view = `../src/${req.body.path}${req.body.component}`;
        var component = require(view).default;
        var props = req.body.props || null;
        const capturedState = FreactalServer.captureState(React.createElement(component, props));
        Rapscallion.render(capturedState.Captured)
            .toPromise()
            .then(appHTML => {
                return res.status(200).send(`
                    <div id="${req.body.component}-root">${appHTML}</div>
                    <script>window.__props__ = ${JSON.stringify(props)}</script>
                    <script>window.__state__ = ${JSON.stringify(capturedState.state[0])}</script>
                `).end();
            });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message).end();
    }
});

var aphrodite = require('aphrodite');
var StyleSheetServer = aphrodite.StyleSheetServer;

app.use('/render-aphrodite', function (req, res) {
    try {
        var view = `../src/${req.body.path}${req.body.component}`;
        var component = require(view).default;
        var props = req.body.props || null;
        var staticContent = StyleSheetServer.renderStatic(() => {
            return ReactDOMServer.renderToString(
                React.createElement(component, props)
            );
        });
        res.status(200).send(`
            <style data-aphrodite>${staticContent.css.content}</style>
            <div id="${req.body.component}-root">${staticContent.html}</div>
            <script>window.__props__ = ${JSON.stringify(props)}</script>
            <script>window.renderedClassNames = ${JSON.stringify(staticContent.css.renderedClassNames)};</script>
        `).end();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message).end();
    }
});

app.use('/render-landing_pages', function (req, res) {
    try {
        var componentPath = `../src/${req.body.path}${req.body.component}`;
        var rootReducerPath = '../src/landing_pages/reducers';
        var Component = require(componentPath).default;
        var rootReducer = require(rootReducerPath).default;
        var props = req.body.props || null;
        var getInitialState = require('../src/landing_pages/reducers/initialState.js').default;
        var initialState = getInitialState();
        initialState.date = props.booking_day;
        if (props.tag) {
            initialState.tag = props.tag;
        }
        if (props.location_desc) {
            initialState.location_desc = props.location_desc;
        }
        delete props.booking_day;
        var store = Redux.createStore(rootReducer, initialState, Redux.applyMiddleware(thunkMiddleware));
        var actions = require('../src/landing_pages/actions').default;
        Promise.all([
            store.dispatch(actions.fetchTags(config, props.language_code)),
            store.dispatch(actions.fetchSearchVerticals(config, props.language_code))
        ])
        .then(() => {
            if (!props.tag) {
                store.dispatch(actions.setDefaultTag());
            }
            var preloadedState = store.getState();
            var HeaderElement = React.createElement(Component, props);
            var Provider = React.createElement(ReactRedux.Provider, { store }, HeaderElement);
            var staticContent = StyleSheetServer.renderStatic(() => {
                return ReactDOMServer.renderToString(Provider);
            });
            res.status(200).send(`
                <style data-aphrodite>
                    ${staticContent.css.content}
                </style>
                <div id="${req.body.component}-root">${staticContent.html}</div>
                <script>window.__props__ = ${JSON.stringify(props)}</script>
                <script>window.__state__ = ${
                    JSON.stringify(preloadedState).replace(/</g, '\\u003c')
                }</script>
                <script>
                    window.renderedClassNames = ${JSON.stringify(staticContent.css.renderedClassNames)};
                </script>
            `).end();
        })
        .catch(error => {
            console.log(error);
            res.status(400).send(error).end();
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message).end();
    }
});

app.use('/render-checkout', function (req, res) {
    try {
        var componentPath = `../src/${req.body.path}${req.body.component}`;
        var rootReducerPath = `../src/payments/reducers`;
        var Component = require(componentPath).default;
        var rootReducer = require(rootReducerPath).default;
        var props = req.body.props || null;
        var store = Redux.createStore(rootReducer);
        var Checkout = React.createElement(Component, props);
        var Provider = React.createElement(ReactRedux.Provider, { store }, Checkout);
        var Element = ReactDOMServer.renderToString(Provider);
        var preloadedState = store.getState();
        res.status(200).send(`
            <div id="${req.body.component}-root">${Element}</div>
            <script>window.__props__ = ${JSON.stringify(props)}</script>
            <script>window.__state__ = ${
                JSON.stringify(preloadedState).replace(/</g, '\\u003c')
            }</script>
        `).end();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message).end();
    }
});

app.use('/render-search', function (req, res) {
    try {
        var componentPath = `../src/${req.body.path}${req.body.component}`;
        var rootReducerPath = `../src/search/reducers`;
        var Component = require(componentPath).default;
        var rootReducer = require(rootReducerPath).default;
        var props = req.body.props || null;
        var store = Redux.createStore(rootReducer);
        var Search = React.createElement(Component, props);
        var Provider = React.createElement(ReactRedux.Provider, { store }, Search);
        var staticContent = StyleSheetServer.renderStatic(() => {
            return ReactDOMServer.renderToString(Provider);
        });
        var preloadedState = store.getState();
        res.status(200).send(`
            <style data-aphrodite>
                ${staticContent.css.content}
            </style>
            <div id="${req.body.component}-root">
                ${staticContent.html}
            </div>
            <script>
                window.__props__ = ${JSON.stringify(props)}
            </script>
            <script>
                window.__state__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script>
                window.renderedClassNames = ${JSON.stringify(staticContent.css.renderedClassNames)};
            </script>
        `).end();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message).end();
    }
});

server.listen(3000);
