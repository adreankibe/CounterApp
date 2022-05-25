const mongoose = require('mongoose');
const outletSchema = mongoose.Schema({
 name:String,
 device_id:String,
 ip_address:String,
 building_id:String,
 properties:{}
})
const Outlet = mongoose.model('Outlet', outletSchema)
module.exports = Outlet