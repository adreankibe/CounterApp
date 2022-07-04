const Target = require('../../models/target')
const create_target = (req,res) => {
    const { period,maximum_value } = req.body;
    Target.findOne({period:period},(err,target)=>{
        if(target)
        {
            req.flash('danger','Target period already exists.');
            res.redirect('/account/targets')
        }
        else
        {
            let data = new Target({
                period:period,
                maximum_value:maximum_value
            })
            data.save(()=>{
                req.flash('info','Target saved succcessfully.');
                res.redirect('/account/targets')
            })
        }
    })

}
module.exports = create_target