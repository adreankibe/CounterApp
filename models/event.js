const mongoose = require('mongoose');
const eventSchema = mongoose.Schema({
    name: String,
    start_date: String,
    end_date: String,
    total: Number,
    status:String,
    building_id:String,
    previous:Number
})
const Event = mongoose.model('Event', eventSchema)
module.exports = Event