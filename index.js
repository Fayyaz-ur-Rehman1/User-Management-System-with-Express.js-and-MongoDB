const express = require("express");
const { connectMongoDb } = require("./connection");
const { logReqRes, checkAge } = require("./middleware/index");
const userRouter = require("./routes/user");


const app = express();
const PORT = 10000;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(console.log("Mongodb Connected"));

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logReqRes("log.txt"));
app.use(checkAge)

// Routes
app.use("/user", userRouter);

app.listen(PORT, console.log(`Server is Start at Port ${PORT}`))