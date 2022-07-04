const Target =require('../../models/target')
const targets = (req, res) =>{
    Target.find({},(err,targets)=>{
        res.render('./account/setTargets/targets.jade',{
            user:req.user,
            targets:targets
        })
    
    })

}

module.exports = targets
