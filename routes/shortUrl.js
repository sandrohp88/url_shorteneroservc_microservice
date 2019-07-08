const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { connection, Schema } = mongoose
const uri =
  'mongodb+srv://sandrohp88:wy4Pf2fDECCC7znj@freecodecampapimicroservices-qsq8r.mongodb.net/freecodecamp?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true }).catch(console.error)
// create the Schema
const UrlSchema = new Schema(
  { original: String},
  { collection: 'urlshortener' }
)

const Url = mongoose.model('Url', UrlSchema)

router
  .post('/new', function(req, res, next) {
    const { url } = req.body
    // TODO verify url
    const newUrl = new Url({ original: url })
    newUrl.save(err => {
      if (err) return console.log(err)
      res.send({ original: url })
    })
  })
  .route('/:id')
  .get((req, res, next) => {
    const id = req.params.id
    Url.findById(id, (err, url) => {
      if (err) return console.log(err)
      res.send(url)
      console.log(url.original)
    })
  })
module.exports = router
