const express = require("express")
const dotenv = require("dotenv")
const session = require("express-session")
const PORT = 1212
const db = require("./config/Db")
const router = require("./routes/userRouter")
const route = require("./routes/recordRouter")

const app = express()
app.use(express.json())
app.use(
    session({
        secret: process.env.secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
    })
)

app.use(router)
app.use(route)

app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`);
})