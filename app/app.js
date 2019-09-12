const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config/index')
const ananas = require('./ananas/route')

const app = express()

// app.use(useragent.express())

// if (app.get('env') === 'development') {
//     app.use((req, res, next) => {
//         logger.info(`${req.method} ${req.originalUrl}`)
//         res.on('finish', () => {
//             logger.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
//             if (res.data) {
//                 console.log(res.data)
//             }
//         })
//         next()
//     })
// }


app.use(bodyParser.text())
app.use(bodyParser.json())
// app.use(cookieParser())

app.use(['/api/v1', '/api/v1.0'], (req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.cors.allowOrigin)
    res.header('Access-Control-Allow-Headers', config.cors.allowHeaders)
    res.header('Access-Control-Expose-Headers', config.cors.exposeHeaders)
    res.header('Access-Control-Allow-Methods', config.cors.allowMethods)
    next()
}, ananas)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error(`Not Found ${req.path}`)
    err.status = 404
    next(err)
})

// app.use(generateCustomErrorMessage)

app.use((error, req, res, next) => {
    if (error.errors) {
        if (/^\/api/.test(req.originalUrl)) {
        return res.status(400).json({
            error: {
            name: error.name,
            errors: error.errors
            },
            message: error.message
        })
        } else {
        return res.status(400).send(error.message)
        }
    }
    next(error)
})

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//         console.log(err)
//         res.status(err.status || 500)
//         logger.error(err.message)
//         if (/^\/api/.test(req.originalUrl)) {
//         res.json({
//             message: err.message,
//             error: err
//         })
//         } else {
//         res.send(err.message)
//         }
//     })
// }

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    if (err.status >= 500) {
        // we are using this before production, for staging
        // const Rollbar = require('rollbar')
        // new Rollbar({
        // accessToken: process.env.ROLLBAR_TOKEN,
        // captureUncaught: true,
        // captureUnhandledRejections: true
        // }).error(err)
        // logger.error(err)
        res.json({
            message: err.message
        })
        }
    if (/^\/api/.test(req.originalUrl)) {
        res.json({
        message: err.message
        })
    } else {
        res.send(err.message)
    }
})
  
console.log('***********************************************')
console.log('*********  Server is ready for usage  *********')
console.log('***********************************************')
console.log('***********************************************')


module.exports = app