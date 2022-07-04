const express = require('express');
const router = express.Router();

// auth
const auth = require('../middlewares/check_user')


// buildings
// const all_buildings = require('../account_functions/buidlings/buildings');
// const add_new_building = require('../account_functions/buidlings/add_new_building')
// router.get('/', auth, all_buildings)
// router.post('/add_new_building',auth,add_new_building)



//Dashboard
const dashboard = require('../account_functions/dashboard/dashboard')
router.get('/dashboard',auth,dashboard)


//events/holiday
const events = require('../account_functions/holidays/holiday')
const add_new_event = require('../account_functions/holidays/add_new_event')
const delete_event = require('../account_functions/holidays/del_event')
router.get('/events',auth,events)
router.get('/delete_event/:id',auth,delete_event)
router.post('/add_new_event',auth,add_new_event)


//targets
const targets = require('../account_functions/setTargets/targets')
const create_target = require('../account_functions/setTargets/create_target')
const edit_target = require('../account_functions/setTargets/edit_target')
const delete_target = require('../account_functions/setTargets/delete_target')
router.get('/targets',auth,targets)
router.post('/create_target',auth,create_target)
router.post('/edit_target',auth,edit_target)
router.get('/delete_target/:id',auth,delete_target)


// outlets
const outlets = require('../account_functions/outlets/outlets')
const add_new_outlet = require('../account_functions/outlets/add_new_outlet')
const edit_outlet = require('../account_functions/outlets/edit_outlet')
const delete_outlet = require('../account_functions/outlets/delete_outlet')
const realtime = require('../account_functions/outlets/realtime')
router.get('/outlets',auth,outlets)
router.get('/realtime/:id',auth,realtime)
router.post('/add_new_outlet',auth,add_new_outlet)
router.post('/edit_outlet',auth,edit_outlet)
router.get('/delete_outlet/:id',auth,delete_outlet)

//settings
const settings = require('../account_functions/settings/settings')
router.get('/settings', auth,settings)


// const outlets = require('../account_functions/outlets/outlets')
// const add_new_outlet = require('../account_functions/outlets/add_new_outlet')
// const add_new_event = require('../account_functions/outlets/add_new_event')
// const realtime = require('../account_functions/outlets/realtime')
// const filter = require('../account_functions/outlets/filter_reports')
// router.get('/outlets/:id',auth,outlets)
// router.get('/realtime/:id',auth,realtime)
// router.post('/add_new_outlet/:id',auth,add_new_outlet)
// router.post('/add_new_event/:id',auth,add_new_event)
// router.post('/filter_reports/:id' ,auth,filter)




// reports
const reports = require('../account_functions/reports/reports');
const realtime_report = require('../account_functions/reports/realtime_report')
router.get('/reports/:device_id/:id2/:id3',auth,reports)
router.get('/realtime_report/:id',auth,realtime_report)


module.exports = router