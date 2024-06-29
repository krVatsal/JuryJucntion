import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});

const app = express()
app.use(cookieParser())
app.use(cors({
 origin: process.env.CORS_ORIGIN,
 credentials: true,
}
))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(express.static("public"))


import clientRoute from "./routes/client.routes.js"
import advocateRoute from "./routes/advocate.routes.js"
import queryRoute from "./routes/query.routes.js"



app.use("/api/v1/client", clientRoute)
app.use("/api/v1/advocate", advocateRoute)
app.use("/api/v1/query", queryRoute)

//sample backend url
//http://localhost:5217/api/v1/client/login


export default app