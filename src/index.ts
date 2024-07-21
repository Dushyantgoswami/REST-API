import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv"
import connectDB from "./config/db";
import router from "./router/index";



const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT;

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', router)

app.listen(PORT, () => console.log("Server is running on PORT:", PORT));