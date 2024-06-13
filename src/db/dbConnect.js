import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
    //   await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
      await mongoose.connect("mongodb://localhost:27017/JurisJunction")
       console.log("Server connected to Database successfully")
    } catch (error) {
        console.log("Error connecting the database")
       return res
       .status(200)
       .json(400, error, "Error connecting the database")
       process.exit(1)
    }
}
export default connectDB