// LIBRARY
const mongojs = require('mongojs')

// MODELS
const Outlet = require('../../models/outlet')
const Building = require('../../models/building')
const Report = require('../../models/reports')
// FUNCTIONS
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
const realtime_report = (req, res) => {
    const { id } = req.params;
    Report.findById(id, (err, report) => {
        if (report) {
            let array = report.count;
            let enter = 0;
            let leave = 0;
            let returns = 0;
            let passings = 0;
            let total = 0;
            array.map((y) => {
                enter += parseInt(y.Enters)
                leave += parseInt(y.Exits)
                returns += parseInt(y.Returns)
                passings += parseInt(y.Passings)
            })
            setTimeout(() => {
                total = (parseInt(enter))
                res.send({ success: true, enter: enter, leave: leave, passings: passings, returns: returns, total: total })
            }, 1500)
        }
    })
}
module.exports = realtime_report