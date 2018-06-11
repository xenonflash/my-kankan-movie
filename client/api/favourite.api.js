const { makeRequest } = require('./api-utils.js')
const config = require('../config.js')
let api = {}
api.getFavList = makeRequest(config.service.fav)
api.addFav = makeRequest(config.service.fav, 'PUT')

module.exports = api