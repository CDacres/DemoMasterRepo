import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Rapscallion from 'rapscallion';
import FreactalServer from 'freactal/lib/server';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import aphrodite from 'aphrodite';

require('babel-register');

// var redis = require('redis');

const app = express();
const server = http.createServer(app);

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


app.use(bodyParser.json());

app.use('/render-freactal', (req, res) => {
    try {
        const view = `../src/${req.body.path}${req.body.component}`;
        const component = require(view).default;
        const props = req.body.props || null;
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

const StyleSheetServer = aphrodite.StyleSheetServer;

app.use('/render-aphrodite', (req, res) => {
    try {
        const view = `../src/${req.body.path}${req.body.component}`;
        const component = require(view).default;
        const props = req.body.props || null;
        const staticContent = StyleSheetServer.renderStatic(() => {
            return ReactDOMServer.renderToString(
                React.createElement(component, props)
            );
        });
        res.status(200).send(`
            <style data-aphrodite>${staticContent.css.content}</style>
            <div id="${req.body.component}-root">${staticContent.html}</div>
            <script>window.renderedClassNames = ${JSON.stringify(staticContent.css.renderedClassNames)};</script>
        `);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message).end();
    }
});

server.listen(3000);
