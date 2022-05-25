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
const reports = (req, res) => {
    const { device_id, id2, id3 } = req.params
    Outlet.findById(id2, (err, outlet) => {
        Building.findById(id3, (err, building) => {
            Report.find({ device_id: device_id }, (err, reports) => {

                let currentdate = new Date();
                var oneJan = new Date(currentdate.getFullYear(), 0, 1);
                var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
                var week_no = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
                const year = currentdate.getFullYear();
                const nm = currentdate.getMonth() + 1
                const day = ("0" + currentdate.getDate()).slice(-2);
                const day_ = currentdate.getDate()
                const month = ("0" + (currentdate.getMonth() + 1)).slice(-2);
                const today = year + "-" + month + "-" + day
                reports.map((x) => {
                    let array = x.count;
                    let enter = 0;

                    let leave = 0;
                    let returns = 0;
                    let passings = 0;
                    let total = 0
                    array.map((y) => {
                        enter += parseInt(y.Enters)
                        leave += parseInt(y.Exits)
                        returns += parseInt(y.Returns)
                        passings += parseInt(y.Passings)
                        
                    })
                    setTimeout(()=>{
                        x.enter =enter;
                        x.leave = leave;
                        x.returns = returns;
                        x.passings = passings;
                        x.total = (parseInt(enter))
                    },500)
                })


                setTimeout(() => {
                    res.render('./account/reports/reports.jade', {
                        building: building,
                        outlet: outlet,
                        reports: reports,
                        user:req.user,
                        today:today
                    })
                }, 5000)
            }).sort({_id:-1})

        })
    })

}
module.exports = reports