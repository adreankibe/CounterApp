const Outlet = require('../../models/outlet')

const add_new_outlet = (req,res) =>{
    const {device_id, outlet_name} =req.body
    const data = new Outlet()
    data.device_id = device_id
    data.outlet_name = outlet_name
    data.device_properties = {}
    data.save(() =>{
        req.flash('Info', 'Outlet saved successfully')
        res.redirect('/account/outlets')
    })
    

}

module.exports = add_new_outlet