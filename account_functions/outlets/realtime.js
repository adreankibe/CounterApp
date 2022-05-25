// Models
const Report = require('../../models/reports');
const Event = require('../../models/event');
const Building = require('../../models/building')
const Outlet = require('../../models/outlet')

// FUNCTIONS
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

const realtime = (req, res) => {
    const { id } = req.params;
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
    const year_month = year + "-" + month
    const hour = addZero(currentdate.getHours())
    const minute = addZero(currentdate.getMinutes())
    const time = hour + ":" + minute;
    Outlet.find({ building_id: id }, (err, outlets) => {
        Report.find({}, (err, reports) => {


            Event.findOne({ building_id: id, status: 'Active' }, (err, event) => {

                let todays_total = 0;
                let weeks_total = 0;
                let month_total = 0;
                let data  = [];
                let labels = []
                outlets.map((x) => {
                    let filter = reports.filter((y) => { return x.device_id == y.device_id });
                    if (filter.length > 0) {
                        filter.map((z) => {
                            let count = z.count;
                            if (count.length > 0) {
                                let total = 0;
                                count.map((u) => {
                                    total += parseInt(u.Enters)
                                })
                                setTimeout(() => {
                                    if (z.date === today) {
                                        todays_total += total
                                        labels.push(x.name)
                                        data.push(total)
                                    }
                                    if (parseInt(z.week_no) === parseInt(week_no)) {
                                        weeks_total += total
                                    }
                                    if (z.year_month === year_month) {
                                        month_total += total
                                    }
                                }, 800)
                            }

                        })
                    }
                })
                setTimeout(() => {
                    if(event)
                    {
                        let query = { _id: event.id }
                        let data = {}
                        let tot = parseInt(event.total) - parseInt(event.previous);
                        tot = parseInt(tot) + parseInt(todays_total)
                        data.total = parseInt(tot);
                        data.previous = parseInt(todays_total)
                        console.log(data)
                        Event.updateOne(query, data, () => {
                            Event.findById(event.id, (err, event) => {
                             console.log(data) 
                                res.send({ success: true, todays_total: todays_total, weeks_total: weeks_total, month_total: month_total, event: event,data:data,labels:labels })
                            })
                        })
                    }
                    else
                    {
                        res.send({ success: true, todays_total: todays_total, weeks_total: weeks_total, month_total: month_total, event:null,data:data,labels:labels})
                  
                    }
                    

                }, 4500)

            })
        })
    })

}
module.exports = realtime;