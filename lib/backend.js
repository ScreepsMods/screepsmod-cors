const express = require('express')
const cors = require('cors')

module.exports = function(config){
  const router = new express.Router();
  config.cors = {
    router: router,
    whitelist: null,
    allowedHeaders: [
      'Authorization',
      'Content-Type',
      'X-Token',
      'X-Username',
      'X-Server-Password',
    ],
    exposedHeaders: [
      'X-Token',
      'X-Username',
      'X-Server-Password',
    ],
    corsOptionsDelegate: function(req,cb){
      cb(null,{ 
        origin: config.cors.whitelist || true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: config.cors.allowedHeaders,
        exposedHeaders: config.cors.exposedHeaders,
        preflightContinue: false
      })
    }
  }
  let onExpressPreConfig = config.backend.onExpressPreConfig
  config.backend.onExpressPreConfig = function(app) {
    app.use(config.cors.router)
    return onExpressPreConfig(app)
  }

  router.use(cors(config.corsOptionsDelegate))
}