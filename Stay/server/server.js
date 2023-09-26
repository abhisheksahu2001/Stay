const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const app = express()
const db = process.env.DATABASE_URL
mongoose.connect(db).then((res)=>{
    console.log("Database is connected successful")
}).catch((err) => console.log(err));


app.get('/' , (req , res) =>{
    res.send("hello")
})
app.get('/users' , async (req , res)=>{
    const user = mongoose.model('user')
    const data = await user.find({});
    res.send(data)

})

app.listen(8000, ()=>{
    console.log("server is running at : http://localhost:8000" )
});