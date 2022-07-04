const mongojs = require('mongojs')

const Reports = require('../../models/reports')
const Outlet = require('../../models/outlet')
const Building = require('../../models/building')
const Event = require('../../models/event')
const { mapReduce } = require('../../models/reports')



const filter_reports = (req, res) => {
    console.log(req.body)

    const {id, start_date, todays_total, weeks_total, month_total, data, labels } = req.params
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
    
    Building.findById(id,(err, building) =>{
        Outlet.find({building_id:id}, (err, outlets) => {
            Reports.find({created_at: start_date}, function (err, reports){
                Event.find({}, (err, events) =>{
                    if(err) return handleError(err);
                    let todays_total = 0;
                    let weeks_total = 0;
                    let month_total = 0;
                    let labels = [];
                    let data = []
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
                                    }, 500)
                                }
                                
                            })
                        }

                    })
                    




                    setTimeout(()=>{
                        console.log(labels);
                        console.log(data);
                        console.log(reports)
                        // res.render('./account/outlets/outlets.jade', {
                        //     user: req.user,
                        //     building: building,
                        //     outlets: outlets,
                        //     reports: reports,
                        //     events: events,
                        //     todays_total: todays_total,
                        //     weeks_total: weeks_total,
                        //     month_total: month_total,
                        //     data:data,
                        //         labels:labels
                        // })

                    },4000)
                        
                    
                    


                })

    
            })
    
    
        })
    

    })



}
module.exports = filter_reports


// building - > tdc , tmall > outlets/:buidling_id >reports/outlets/events ( building_id );



