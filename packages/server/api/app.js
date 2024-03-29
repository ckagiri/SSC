import models from './models';
import entities from './entities';
import authorization from './authorization';
import dataloaders from './dataloaders';

const path = require('path');

const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const rest = require('@feathersjs/express/rest');
const socketio = require('@feathersjs/socketio');
const handler = require('@feathersjs/express/errors');
const notFound = require('feathers-errors/not-found');

const middleware = require('./middleware');
const appHooks = require('./app.hooks');
const authentication = require('./authentication');
const mongodb = require('./mongodb');
const graphql = require('./graphql');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

app.configure(mongodb);
app.configure(rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our models
app.configure(models);
// Set up entities (wrapping models with authorization)
app.configure(entities);

// Create dataloaders for req data caching
app.configure(dataloaders);

// Register authenticate service
app.configure(authentication);

// Authenticate user and setting up ability for user
app.configure(authorization);

// Set up GraphQL endpoint
app.configure(graphql);

// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

module.exports = app;
