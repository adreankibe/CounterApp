const mongoose = require('mongoose');
const reportSchema = mongoose.Schema({
 device_id:String,
 count:[],
 date:String,
 year_month:String,
 week_no:String,
 created_on:Date
})
const Report = mongoose.model('Report', reportSchema)
module.exports = Report