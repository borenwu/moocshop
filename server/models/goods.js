const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice":Number,
  "productImage":String
})

module.export = mongoose.model('Good',productSchema)
