const mongoose = require('mongoose')
const Wastebin = mongoose.model('wastebins');
const moment = require('moment');
const fs = require('fs');
// const jwt = require('jsonwebtoken')
// const {jwtkey} = require('../keys')
 
const WastebinController = {

    async index(req, res){
        const devices = await Wastebin.find();
       res.send(devices);
   },
 
    async store(req, res){
 
        const devices = {
            "id":req.body.id,
            "name":req.body.name,
            "usage":req.body.usage,
            "asset":req.body.group,
            "assetid":req.body.groupid,
            "ts":req.body.ts
        } = req.body;
 
        try{
        const device = new Wastebin(devices)
         await device.save();
         //const token = jwt.sign({appointmentId:appointment._id},jwtkey)
        res.send({"Status": "Success", "Message": "Wastebin Device record created Successfully."})
        //res.send({token})
        }       
         catch(err){
             console.log(err)
         }
     
        
    },
 
    async show(req, res){
        
        console.log(req.params.id)
        try{
         const SingleDevice = await Wastebin.findById(req.params.id);
          console.log(SingleDevice);
         if(!SingleDevice) throw Error ('No Smart Sense Device available with requested Id');
         res.status(200).json(SingleDevice);
        }
        catch(err){
             res.status(400).json({Message: err});
        }
    },

    async showbyasset(req, res){
        try{
         const SingleDevice = await Wastebin.find({assetid:req.params.assetid});
          console.log(SingleDevice);
         if(!SingleDevice) throw Error ('No Wastebin Device available with requested Id');
         res.status(200).json(SingleDevice);
        }
        catch(err){
             res.status(400).json({Message: err});
        }
    },

    async showbydateRange(req, res){
        console.log("start Date : ",moment(req.params.sd).format('ll') )
        console.log("End Date : ", moment(req.params.ed).format('ll'))
        try{
         const SingleDevice = await Wastebin.find({ts: { $gt: req.params.sd },  ts: { $lt: req.params.ed }});
          console.log(SingleDevice);
         if(!SingleDevice) throw Error ('No Wastebin Device available with requested date range...');
         res.status(200).json(SingleDevice);
        }
        catch(err){
             res.status(400).json({Message: err});
        }
    },
 
    
 showdeviceData(req, res){
    try {
        const jsonString = fs.readFileSync("./utils/wastebinDevices.js");
        const Wastebins = JSON.parse(jsonString);
        const RequestedDevices = Wastebins.filter(d => (d.ts > req.params.sd && d.ts < req.params.ed));
        res.status(200).json(RequestedDevices);
       // console.log("Devices Count:", RequestedDevices.length);
      } catch (err) {
        console.log(err);
        return;
      } 
       
    
}
   
  
  };
  
  module.exports = WastebinController;