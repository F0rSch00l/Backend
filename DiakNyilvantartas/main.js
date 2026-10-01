const express = require("express");
const mysql2 = require("mysql2");
const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Mükszik");
});

app.post("/upload", (req,res) =>{
    
})

app.listen(3000);

console.log("Szerver fut a 3000-es porton")