require('dotenv').config()
const express=require('express');
const connectDb = require('./utils/db');
const authRoute = require('./routes/authRoutes');
const userRoute=require('./routes/userRoutes');
const restaurentRoute=require('./routes/restaurentRoutes')
const categoryRoute=require('./routes/categoryRoutes');
const foodRoute=require('./routes/foodRoutes');
const app= express();

//middleware
app.use(express.json())

//routes
app.use('/api/v1/',authRoute)
app.use('/auth/v1/',userRoute)
app.use('/api/v1/restaurent/',restaurentRoute)
app.use('/api/v1/category/',categoryRoute)
app.use('/api/v1/food/',foodRoute)

app.get('/',(req,res)=>{
    res.status(200).send("welcome its run")
})

const PORT=8040;

connectDb().then(()=>{

    app.listen(PORT,()=>{
        console.log("server is running");
    })

})
