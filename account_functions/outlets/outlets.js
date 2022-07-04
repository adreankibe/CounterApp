const Outlet = require('../../models/outlet')



const outlets = (req,res) =>{
    Outlet.find({}, (err, outlets)=>{
        res.render('./account/outlets/outlets.jade',{
            user:req.user,
            outlets:outlets
        })
    })


}

module.exports = outlets