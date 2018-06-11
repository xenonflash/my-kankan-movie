const { makeRequest } = require('./api-utils.js')
const config = require('../config.js')
let api = {}
api.getMovieList  = makeRequest(config.service.movie)

module.exports = api