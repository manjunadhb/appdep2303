const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path=require("node:path");
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build")));


app.get("/getEmployees",async (req,res)=>{
    //limit(100).skip(10)
    //.select({ firstName: 1, lastName: 1,_id:0 });
    //.sort([['department', 'desc']])
    //.and([{ country: 'Russia',age: { $gte: 18,$lte:35 }}])
    let retrievedData = await Employee.find()
    // .select({country:1,_id:0}).distinct("country")
    res.json(retrievedData);
})

app.put("/updateCountry",async (req,res)=>{

    let result = await Employee.updateMany({country:"China"},{country:"India",firstName:"Radha",lastName:"Krishna"})

    res.json(result);


})

app.delete("/deleteCountry",async (req,res)=>{

    let result = await Employee.deleteMany({country:"United Kingdom"})

    res.json(result);

})

app.listen(1111,()=>{
    console.log("Listening to port 1111")
})







let connectToMDB = async ()=>{

    try{
        await mongoose.connect("mongodb+srv://manjunadhb:manjunadhb@cluster0.bixbzsm.mongodb.net/Batch2303?retryWrites=true&w=majority")

        console.log("successfully connected to mdb");
        // getDataFromMDB();

    }catch(err){
        console.log("Unable to connect to mdb")
    }
}

let employeeSchema = new mongoose.Schema({
    id:Number,
firstName:String,
lastName:String,
email:String,
gender:String,
country:String,
age:Number,
department:String
})

let Employee = new mongoose.model("employee",employeeSchema);

let getDataFromMDB = async ()=>{
    let retrievedData = await Employee.find()
    console.log(retrievedData);
}



connectToMDB();