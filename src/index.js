//ไปหยิบไฟล์ config.env ที่เราเก็บ URI PORT และชื่อ HOSTNAME ไว้
require('dotenv').config({path: './config.env'});
//สร้างตัวแปรเพื่อเก็บค่า modules ของ express มาใช้
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4001;

const staffRoute = require("./routes/staffRoute");
const borrowRoute = require("./routes/borrowRoute");
const bookRoute = require("./routes/bookRoute");
const memberRoute = require("./routes/memberRoute");

//จำเป็น
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//ดึงค่าConfig ใน db.js มาใช้ใน app
require("./db")(app);

//localhost:4000/staff
app.use("/staff",staffRoute);
app.use("/borrow", borrowRoute);
app.use("/book", bookRoute);
app.use("/member", memberRoute);


app.get("/", (req, res)=>{
    res.send("Hello from insex");
});

app.listen(port, ()=>{
    console.log("App is running on port" + port);
});