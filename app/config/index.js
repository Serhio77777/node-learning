
module.exports = {
    web: {
      port: process.env.PORT || 27182,
      userTokenLifeTime: process.env.USER_TOKEN_LIFE_TIME || 2592000
    },
    cors: {
      allowOrigin: process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN,
      allowHeaders: process.env.CORS_ACCESS_CONTROL_ALLOW_HEADERS,
      allowMethods: process.env.CORS_ACCESS_CONTROL_ALLOW_METHODS,
      exposeHeaders: process.env.CORS_ACCESS_CONTROL_EXPOSE_HEADERS
    }
  }
  