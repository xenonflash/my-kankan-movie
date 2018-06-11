const { makeRequest } = require('./api-utils.js')
const config = require('../config.js')
let api = {}
api.getCommentList = makeRequest(config.service.comment)

module.exports = api