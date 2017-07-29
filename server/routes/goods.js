const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
var Goods = require('../models/goods')

//连接mongodb
mongoose.connect('mongodb://127.0.0.1:27017/dumall')


mongoose.connection.on("connected", () => {
  console.log("MongoDB connected success")
})

mongoose.connection.on("eror", () => {
  console.log("MongoDB connected fail")
})

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connected disconnected")
})

router.get("/", (req, res, next) => {
  Goods.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: 0,
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

module.exports = router
