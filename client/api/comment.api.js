const { makeRequest } = require('./api-utils.js')
const config = require('../config.js')
let api = {}
api.getCommentList = makeRequest(config.service.comment)
api.getCommentDetail = commentId =>  makeRequest(config.service.comment+'/' +commentId)()
api.getCurrUserComment = makeRequest(config.service.currComment)
api.addComment = makeRequest(config.service.comment, 'PUT')

module.exports = api