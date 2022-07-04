const Target = require('../../models/target')

const delete_target = (req, res) =>{
    const {id} = req.params
    Target.findByIdAndRemove(id, (err,delete_target) => {
        req.flash('Info', 'Target Removed')
        res.redirect('/account/targets')
    })

}

module.exports = delete_target