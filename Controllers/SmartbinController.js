const mongoose = require('mongoose')
const Smartbin = mongoose.model('smartbins');
const moment = require('moment');
const fs = require('fs');
 
const SmartbinController = {

 index(req, res){
    try {
        const jsonString = fs.readFileSync("./utils/smartbinList.js");
        const Smartbins = JSON.parse(jsonString);
        console.log("Smartbin List", Smartbins)
        //const RequestedDevices = Smartbins.filter(d => (d.ts > req.params.sd && d.ts < req.params.ed));
        res.status(200).json(Smartbins);
       // console.log("Devices Count:", RequestedDevices.length);
      } catch (err) {
        console.log(err);
        return;
      } 
       
    
}
   
  
  };
  
  module.exports = SmartbinController;