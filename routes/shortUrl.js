const express = require('express')
const router = express.Router()
// example: POST [project_url]/api/shorturl/new - https://www.google.com

router.post('/', function(req, res, next) {
  const { url } = req.body
  res.send({ original: url })
})
module.exports = router
