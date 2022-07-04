const Event = require('../../models/event')

const add_new_event = (req, res) =>
{
    const {name, start_date, end_date} = req.body
    const data = new Event()
    data.name = name
    data.start_date = start_date
    data.end_date = end_date
    data.count = 0
    data.save(() =>{
        req.flash('Info', 'New Event added')
        res.redirect('/account/events')
    })

}

module.exports = add_new_event