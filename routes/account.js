const express = require('express');
const router = express.Router();

// auth
const auth = require('../middlewares/check_user')


// buildings
const all_buildings = require('../account_functions/buidlings/buildings');
const add_new_building = require('../account_functions/buidlings/add_new_building')
router.get('/', auth, all_buildings)
router.post('/add_new_building',auth,add_new_building)

// outlets
const outlets = require('../account_functions/outlets/outlets')
const add_new_outlet = require('../account_functions/outlets/add_new_outlet')
const add_new_event = require('../account_functions/outlets/add_new_event')
const realtime = require('../account_functions/outlets/realtime')
router.get('/outlets/:id',auth,outlets)
router.get('/realtime/:id',auth,realtime)
router.post('/add_new_outlet/:id',auth,add_new_outlet)
router.post('/add_new_event/:id',auth,add_new_event)




// reports
const reports = require('../account_functions/reports/reports');
const realtime_report = require('../account_functions/reports/realtime_report')
router.get('/reports/:device_id/:id2/:id3',auth,reports)
router.get('/realtime_report/:id',auth,realtime_report)


module.exports = router