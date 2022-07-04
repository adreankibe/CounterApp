const mongoose = require('mongoose');
const outletSchema = mongoose.Schema({
 outlet_name:String,
 device_id:String,
 device_properties:{}
})
const Outlet = mongoose.model('Outlet', outletSchema)
module.exports = Outlet