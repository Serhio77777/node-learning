const route = require('express').Router()

route.get('/ananas', (req, res, next) => {
    res.send('awdawd')
})

module.exports = route