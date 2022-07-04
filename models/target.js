const mongoose = require('mongoose');
const TargetSchema = mongoose.Schema({
    period:String,
    maximum_value:Number

})
const Target = mongoose.model('Target',TargetSchema);
module.exports = Target