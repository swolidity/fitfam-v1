import 'babel/polyfill';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';
import Router from 'react-router';
import RouterContainer from './RouterContainer';
import routes from './routes';
import RouterActions from './actions/RouterActions';
//import AltIso from 'alt/utils/AltIso'; TODO: use AltIso for server-side async rendering
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Iso from 'iso';
import alt from './alt';
import compression from 'compression';

mongoose.connect('mongodb://heroku_sbp2x1kh:kacfu5h85o03g97lska07qqsev@ds031223.mongolab.com:31223/heroku_sbp2x1kh');

const server = express();

server.use(compression());
server.use(morgan('dev'));

//server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname, 'public')));

// Register API middleware
server.use('/api', require('./api/api.js'));

const templateFile = path.join(__dirname, 'templates/index.html');
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

server.get('*', function(req, res) {

  let router = Router.create({
    routes: routes,
    location: req.url,
    onAbort:(abortReason) => {
      if (abortReason.constructor.name == 'Redirect') {
        let { to, params, query } = abortReason;

        if (!query) query = {};

        // add nextPath to query for friendly forwarding
        query.nextPath = req.url;

        let path = router.makePath(to, params, query);

        res.redirect(path);
      }
    }
  });

  // store the router instance in the RouterContainer
  RouterContainer.set(router);

  router.run((Handler, state) => {

    alt.bootstrap(JSON.stringify({
      RouterStore: {
        route: state
      }
    }));

    let iso = new Iso();

    let data = {title: ''};
    data.body = React.renderToString(<Handler />);
    iso.add(data.body, alt.flush());
    data.body = iso.render();
    let html = template(data);

    res.send(html);
  });
});

// Launch the server
server.listen(server.get('port'), () => {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
