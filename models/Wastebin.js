const mongoose = require('mongoose')

const WastebinDeviceSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    usage:{
        type:Number,
        required:true
    },
    asset:String,
    assetid:String,
    ts:Number
    
},{versionKey: false})


mongoose.model("wastebins",WastebinDeviceSchema)