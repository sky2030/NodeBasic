const { now } = require('mongoose');
const mongoose = require('mongoose')
const SenseReport = mongoose.model('SenseReport');
const fs = require('fs');
// const jwt = require('jsonwebtoken')
// const {jwtkey} = require('../keys')
 
const SmartSenseReportController = {
    async index(req, res){
         const devicesReport = await SenseReport.find();
        res.send(devicesReport);
    },

    async indexbydates(req, res){
        const devicesReport = await SenseReport.find({dt: { $gt: req.params.sd }, dt: { $lt: req.params.ed }});
        res.status(200).json(devicesReport);
      // res.send(devicesReport);
   },
 
    async store(req, res){
 
        const time = new Date();

        const deviceReport= {
            "device_id":req.body.device_id,
            "temp":req.body.temp,
            "co":req.body.co,
            "so2":req.body.so2,
            "pm2":req.body.pm2,
            "aqi":req.body.aqi,
           // "dt":time
        } = req.body;
 
        try{
        const device = new SenseReport(deviceReport)
         await device.save();
         //const token = jwt.sign({appointmentId:appointment._id},jwtkey)
        res.send({"Status": "Success", "Message": "Smart Sense Device Report record created Successfully."})
        //res.send({token})
        }       
         catch(err){
             console.log(err)
         }
     
        
    },
 
    async show(req, res){
        
        console.log(req.params.id)
        try{
        const SingleDevice = await SenseReport.find({device_id:req.params.id});
         // console.log(SingleDevice);
         if(!SingleDevice) throw Error ('No Smart Sense Device Report available with requested Id');
         res.status(200).json(SingleDevice);
        }
        catch(err){
             res.status(400).json({Message: err});
        }
    },

    async showbydates(req, res){
        
        console.log(req.params.id)
        try{
        const SingleDevice = await SenseReport.find({device_id:req.params.id,dt: { $gt: req.params.sd },  dt: { $lt: req.params.ed }, });
         // console.log(SingleDevice);
         if(!SingleDevice) throw Error ('No Smart Sense Device Report available with requested Id');
         res.status(200).json(SingleDevice);
        }
        catch(err){
             res.status(400).json({Message: err});
        }
    },

    showdeviceData(req, res){
        try {
            const jsonString = fs.readFileSync("./utils/smartsenseReport.js");
            const sensorDevices = JSON.parse(jsonString);
            const RequestedDevices = sensorDevices.filter(d => (d.dt > req.params.sd && d.dt < req.params.ed));
            res.status(200).json(RequestedDevices);
           // console.log("Devices Count:", RequestedDevices.length);
          } catch (err) {
            console.log(err);
            return;
          } 
        
    },
    sendreportbydevice(req, res){
        try {
            const jsonString = fs.readFileSync("./utils/smartsenseReport.js");
            const sensorDevices = JSON.parse(jsonString);
            const RequestedDevices = sensorDevices.filter(d => (d.device_id === req.params.id && d.dt > req.params.sd && d.dt < req.params.ed));
            res.status(200).json(RequestedDevices);
           // console.log("Devices Count:", RequestedDevices.length);
          } catch (err) {
            console.log(err);
            return;
          } 
        
    }
 
    // async update(req, res){
    //     await  SenseReport.findByIdAndUpdate(req.body.id,{
    //         location:req.body.location,
    //         status:req.body.status,
    //         group:req.body.group,
    
    //     }).then(data=>{
    //          console.log(data)
    //         res.send({"Status": "Success", "Message": "Smart Sense Device Report record Updated Successfully."})
    //         //res.send(data)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // },
 
    // async remove(req, res){
    //     SenseReport.findByIdAndRemove(req.body.id)
    //     .then(data=>{
    //         console.log(data)
    //         res.send( {"Status": "Success", "Message": " Smart Sense Device Deleted Successfully"})
    //         //res.send(data)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }
  };
  
  module.exports = SmartSenseReportController;