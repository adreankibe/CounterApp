// MODELS
const Building = require('../../models/building')
const add_new_building = (req, res) => {
    const {name } = req.body
    Building.findOne({name:name},(err,building)=>{
        if(building)
        {

            req.flash('danger','Building already exists.');
                res.redirect('/account')
        }
        else
        {
            let data = new Building();
            data.name = name;
            data.save(()=>{
                req.flash('info','Building saved successfully.');
                res.redirect('/account')
            })
        }
    })
   
   
}
module.exports = add_new_building