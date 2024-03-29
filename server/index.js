import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
//dotenv load params
dotenv.config()
//express
const app = express()
//method connection to database
const connectToDataBase = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to database")
    } catch (err) {
        console.log(err)
        throw err
    }
}
//connect to database
connectToDataBase()
//middleware
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });
// listen app  
app.listen(process.env.PORT,()=>{
    console.log(`the server running in port ${process.env.PORT}`)
})