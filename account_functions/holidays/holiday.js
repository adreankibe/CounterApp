const Events = require('../../models/event')
const events = (req,res) =>{
    Events.find({}, (err, events) =>{
        res.render('./account/Events/events.jade',{
            user:req.user,
            events:events
        })

    })



}

module.exports = events