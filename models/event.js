const mongoose = require('mongoose');
const eventSchema = mongoose.Schema({
    name: String,
    start_date: String,
    end_date: String,
    count:Number
})
const Event = mongoose.model('Event', eventSchema)
module.exports = Event