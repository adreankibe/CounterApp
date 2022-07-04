const Target = require('../../models/target')

const edit_target = (req,res) => {
    const {target_id, maximum_value} = req.body
    console.log(req.body)
    let query = {
        _id:target_id
    }

    let data = {}
    data.maximum_value = maximum_value;
    Target.updateOne(query, data, () =>{
        req.flash('Info', 'Target Updated')
        res.redirect('/account/targets')
    })

}

module.exports = edit_target