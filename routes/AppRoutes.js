const SmartSenseReportController = require('../Controllers/SenseReportController');
const SmartbinController = require('../Controllers/SmartbinController');
const WastebinController = require('../Controllers/WastebinController');

const express = require('express'),
router = express.Router(),

 SmartSenseController = require('../Controllers/SmartSenseController'); 

// -----------------Smart Sense Routes Starts --------------

router.get('/smartsense/devices',  SmartSenseController.index);
router.post('/smartsense/add', SmartSenseController.store);
router.get('/smartsense/devices/:id', SmartSenseController.show);
router.get('/smartsense/devices/:id/:sd/:ed', SmartSenseReportController.sendreportbydevice);
router.get('/smartsense/devices/:sd/:ed', SmartSenseReportController.showdeviceData);
// router.post('/smartsense/:id', SmartSenseController.update);
// router.post('/smartsense/:id', SmartSenseController.remove);

//---------------------Smart Sense Routes Finish --------------


// -----------------Smart Sense Report Routes Starts --------------
router.get('/smartsense/report', SmartSenseReportController.index);
router.get('/smartsense/report/:sd/:ed', SmartSenseReportController.indexbydates);
router.post('/smartsense/report/add', SmartSenseReportController.store);
router.get('/smartsense/devices/report/:id', SmartSenseReportController.show);
router.get('/smartsense/devices/report/:id/:sd/:ed', SmartSenseReportController.showbydates);

//---------------------Smart Sense Report Routes Finish --------------

// -----------------Wastebin Routes Starts --------------
router.get('/wastebin/devices', WastebinController.index);
//router.get('/wastebin/devices/:sd/:ed', WastebinController.showbydateRange);
router.get('/wastebin/devices/:sd/:ed', WastebinController.showdeviceData);
router.post('/wastebin/add', WastebinController.store);
router.get('/wastebin/devices/:id', WastebinController.show);
router.get('/wastebin/asset/devices/:assetid', WastebinController.showbyasset);

//---------------------Wastebin Routes Finish --------------

// -----------------Smartbin Routes Starts --------------
router.get('/smartbin/devices', SmartbinController.index);

//---------------------smartbin Routes Finish --------------


module.exports = router
	
