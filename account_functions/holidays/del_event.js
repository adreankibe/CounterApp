const Event = require('../../models/event')

const delete_event = (req, res) =>{
    const{id} = req.params;
    Event.findByIdAndRemove(id, (err,delete_event) =>{
        req.flash('Info', 'Event deleted')
        res.redirect('/account/events')

    })

}

module.exports = delete_event