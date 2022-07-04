const Outlet = require('../../models/outlet')

const edit_outlet = (req,res) =>{
  
    const {outlet_id,outlet_name} = req.body
    console.log(req.body)
    let query = {
        _id:outlet_id
    }
    let data = {}
    data.outlet_name = outlet_name;
    Outlet.updateOne(query, data , ()=>{     
        req.flash('Info', 'Outlet Updated')
        res.redirect('/account/outlets')
    })


}

module.exports = edit_outlet