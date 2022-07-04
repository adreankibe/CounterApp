const Outlet = require('../../models/outlet')

const delete_outlet = (req,res) =>{
    const {id} = req.params
    Outlet.findByIdAndRemove(id, (err,delete_outlet) =>{
        req.flash('Info', 'Outlet deleted successfully')
        res.redirect('/account/outlets')

    })


}

module.exports = delete_outlet