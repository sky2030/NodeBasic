const mongoose = require('mongoose')

const SmartSenseReportSchema = new mongoose.Schema({
    device_id:{
        type:String,
        required:true
    },
    name:String,
    temp:String,
    co:String,
    so2:String,
    pm2:String,
    aqi:String,
   // dt:{ type: Date, default: Date.now }
   dt:Number
    
},{versionKey: false})


mongoose.model("SenseReport",SmartSenseReportSchema)