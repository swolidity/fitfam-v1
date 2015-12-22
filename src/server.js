import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from './routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import compression from 'compression';

mongoose.connect('mongodb://heroku_sbp2x1kh:kacfu5h85o03g97lska07qqsev@ds031223.mongolab.com:31223/heroku_sbp2x1kh');

const server = express();

server.use(compression());
server.use(bodyParser.json());
server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname, 'public')));

// Register API middleware
server.use('/api', require('./api/api.js'));

const templateFile = path.join(__dirname, 'templates/index.html');
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

server.get('*', (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const data = {title: ''};
      data.body = renderToString(<RoutingContext {...renderProps} />);
      const html = template(data);

      res.status(200).send(html);
    } else {
      res.status(404).send('Not found');
    }
  });
});

// Launch the server
server.listen(server.get('port'), () => {
  if (process.send) {
    process.send('online');
  } else {
    if (process.env.NODE_ENV !== 'production') {
      console.log('The server is running at http://localhost:' + server.get('port'));
    }
  }
});
