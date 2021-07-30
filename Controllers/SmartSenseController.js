const mongoose = require('mongoose')
const SenseDevice = mongoose.model('Sensedevice');
// const jwt = require('jsonwebtoken')
// const {jwtkey} = require('../keys')
 
const SmartSenseController = {
    async index(req, res){
         const devices = await SenseDevice.find();
        res.send(devices);
    },
 
    async store(req, res){
 
        const devices= {
            // "Id":req.body.Id,
            "name":req.body.name,
            "location":req.body.location,
            "status":req.body.status,
            "group":req.body.group,
        } = req.body;
 
        try{
        const device = new SenseDevice(devices)
         await device.save();
         //const token = jwt.sign({appointmentId:appointment._id},jwtkey)
        res.send({"Status": "Success", "Message": "Smart Sense Device record created Successfully."})
        //res.send({token})
        }       
         catch(err){
             console.log(err)
         }
     
        
    },
 
    async show(req, res){
        
        console.log(req.params.id)
        try{
         const SingleDevice = await SenseDevice.findById(req.params.id);
          console.log(SingleDevice);
         if(!SingleDevice) throw Error ('No Smart Sense Device available with requested Id');
         res.status(200).json(SingleDevice);
        }
        catch(err){
             res.status(400).json({Message: err});
        }
    },
 
    async update(req, res){
        await  SenseDevice.findByIdAndUpdate(req.body.id,{
            location:req.body.location,
            status:req.body.status,
            group:req.body.group,
    
        }).then(data=>{
             console.log(data)
            res.send({"Status": "Success", "Message": "Smart Sense Device record Updated Successfully."})
            //res.send(data)
        })
        .catch(err=>{
            console.log(err)
        })
    },
 
    async remove(req, res){
        SenseDevice.findByIdAndRemove(req.body.id)
        .then(data=>{
            console.log(data)
            res.send( {"Status": "Success", "Message": " Smart Sense Device Deleted Successfully"})
            //res.send(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
  };
  
  module.exports = SmartSenseController;