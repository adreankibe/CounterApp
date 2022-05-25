// LIBRARY: https
const Event = require('../../models/event')

const add_new_outlet = (req, res) => {
    const { name, start_date, end_date } = req.body
    const { id } = req.params
    Event.findOne({  building_id: id,status:'Active' }, (err, event) => {
        if (event) {
            req.flash('danger', 'They are active events / holidays.');
            res.redirect('/account/outlets/' + id)
        }
        else {
            let data = new Event()
            data.name = name;
            data.start_date = start_date;
            data.end_date = end_date
            data.status = 'Inactive'
            data.total = 0;
            data.previous = 0
            data.building_id = id;
            data.save(() => {
                req.flash('info', 'Event saved successfully.');
                res.redirect('/account/outlets/' + id)
            })
        }
    })

}
module.exports = add_new_outlet