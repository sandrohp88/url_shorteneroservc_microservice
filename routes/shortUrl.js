const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { connection, Schema } = mongoose
const dns = require('dns')
const uri =
  'mongodb+srv://sandrohp88:wy4Pf2fDECCC7znj@freecodecampapimicroservices-qsq8r.mongodb.net/freecodecamp?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true }).catch(console.error)
// create the Schema
const UrlSchema = new Schema(
  { original: String },
  { collection: 'urlshortener' }
)

const Url = mongoose.model('Url', UrlSchema)

router
  .post('/new', async function(req, res, next) {
    const { url } = req.body
    // TODO verify url
    dns.lookup(url.split('//')[1], (error, addresses, family) => {
      console.log(error)
      if (error) return res.send({ error: 'invalid URL' })
    })
    const newUrl = new Url({ original: url })
    const response = await newUrl.save()
    res.send({ original_url: response.original, short_url: response._id })
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
