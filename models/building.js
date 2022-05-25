const mongoose = require('mongoose');
const buildingSchema = mongoose.Schema({
 name:String
})
const Building = mongoose.model('Building', buildingSchema)
module.exports = Building