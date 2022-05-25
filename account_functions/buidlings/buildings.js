// MODELS
const Building = require('../../models/building')

const buildings = (req, res) => {
   Building.find({},(err,buildings)=>{
       res.render('./account/buildings/buildings.jade',{
           buildings:buildings,
           user:req.user
       })
   })

}
module.exports = buildings