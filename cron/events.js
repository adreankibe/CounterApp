// Models
const Event = require('../models/event');


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
const events = () => {
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
    // activate event
    Event.findOne({ start_date: today }, (err, event) => {
        if (event) {
            let query = {
                _id: event.id
            }
            let data = {};
            data.status = 'Active'
            Event.updateOne(query, data, () => {

            })

        }
    })

    // deactivate event

    Event.findOne({ end_date: today }, (err, event) => {
        if (event) {
            if (time === "23:59") {
                let query = {
                    _id: event.id
                }
                let data = {};
                data.status = 'Inactive'
                Event.updateOne(query, data, () => {

                })
            }

        }
    })

}
module.exports = events