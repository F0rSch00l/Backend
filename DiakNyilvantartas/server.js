const express = require("express");
const mysql2 = require("mysql2");
const fs = require("fs");
const { connect } = require("http2");
const app = express();


app.use(express.json());

const connection = mysql2.createPool({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "diakok"
});

app.get("/", (req, res) =>{
    res.send("Mükszik");
});

app.get("/osztalyok", (req, res) => {
    const [fields, values] = connection.query('SELECT * FROM diakok');
    console.log(fields);
});

app.post("/upld", (req,res) =>{
    
    res.status(201).send("Fasza");
})

app.listen(3000);

console.log("Szerver fut a 3000-es porton")