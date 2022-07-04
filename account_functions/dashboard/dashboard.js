const dashboard = (req, res) => {
    function addZero(value) {
        value = "0" + value;
        value = value.slice(-2)
        return value;

    }
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = addZero(date.getDate());
    const current_month = months[month]
    const today = day + '-' + current_month + '-' + year 

    res.render('./account/dashboard/dashboard.jade', {
        user: req.user,
        today:today
    })

}
module.exports = dashboard