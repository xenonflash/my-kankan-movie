const { makeRequest } = require('./api-utils.js')
const config = require('../config.js')
let api = {}
api.getCommentList = makeRequest(config.service.comment)
api.addComment = makeRequest(config.service.comment, 'PUT')

module.exports = api