const settings = (req, res) => {
    res.render('./account/settings/settings.jade',{
        user:req.user
    })
}

module.exports = settings













// // LIBRARY
// const fetch = require('node-fetch')

// const settings = (req, res) => {

// }
// module.exports = settings