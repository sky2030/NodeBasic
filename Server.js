const express  = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()
const PORT = 4300
const {CytadbUrl} = require('./keys')

require('./models/SenseDevice')
require('./models/SenseReport')
require('./models/Wastebin')
require('./models/Smartbin')

const AppRoutes = require('./routes/AppRoutes')
app.use(bodyParser.json())
app.use(cors());
app.use(AppRoutes) 


mongoose.connect(CytadbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

mongoose.connection.on('connected',()=>{
    console.log("MongoDB Atlas Connected Successfully")
})

mongoose.connection.on('error',(err)=>{
    console.log("this is error",err)
})



app.listen(PORT,()=>{
    console.log("Server is Running at Port"+" "+PORT)
})