// LIBRARY: https
const Outlet = require('../../models/outlet')

const add_new_outlet = (req, res) => {
    const { name, device_id, ip_address } = req.body
    const { id } = req.params
    Outlet.findOne({ device_id: device_id, building_id: id }, (err, outlet) => {
        if (outlet) {
            req.flash('danger', 'Device ID already exists.');
            res.redirect('/account/outlets/' + id)
        }
        else {
            let data = new Outlet()
            data.name = name;
            data.device_id = device_id;
            data.ip_address = ip_address
            data.building_id = id;
            data.save(() => {
                req.flash('info', 'Outlet saved successfully.');
                res.redirect('/account/outlets/' + id)
            })
        }
    })

}
module.exports = add_new_outlet