const mongoose = require('mongoose')

const SmartSenseDeviceSchema = new mongoose.Schema({
    // Id:{
    //     type:String,
    //     required:true
    // },
    name:{
        type:String,
        required:true
    },
     location:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    group:String,
    
},{versionKey: false})


mongoose.model("Sensedevice",SmartSenseDeviceSchema)