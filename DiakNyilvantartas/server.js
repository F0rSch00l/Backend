const express = require("express");
const mysql2 = require("mysql2");
const fs = require("fs");
const { connect } = require("http2");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());

const connection = mysql2.createConnection({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DP_PW,
    database: process.env.DB_NAME
});

app.get("/", (req, res) =>{
    res.json({
        uzenet: "Kezdő Iskolai REST API fut",
        elerheto_vegpontok: [
            "GET /api/osztalyok",
            "GET /api/osztalyok/:id",
            "GET /api/osztalyok/:id/diakok",
            "GET /api/diakok",
            "GET /api/diakok/:id",
            "GET /api/diakok?aktiv=1"
        ]

    })
});



app.get("/osztalyok", (req, res) => {
    connection.query('SELECT * FROM osztalyok', (err, results) => {
        if(err)
        {
            console.log(err);
            return;
        }
        res.send(results)
    });
});

app.get("/diakok", (req, res) => {
    connection.query('SELECT * FROM diakok', (err, results) => {
        if(err)
        {
            console.log(err);
            return;
        }
        res.send(results)
    });
});


app.post("/osztalyok", (req, res) => {
    connection.query(`INSERT INTO osztalyok (nev,szak,evfolyam) VALUES('${req.body.nev}','${req.body.szak}',${req.body.evfolyam});`, (err, results) => {
        if(err) console.log(err);
        else res.status(201).send("Feltöltés sikeres!")
    });
});

app.delete("/osztalyok/:id", (req, res) => {
    /*connection.query(`DELETE FROM osztalyok WHERE id = ${req.id}`, (err, results) => {
        if (err) console.log(err);
        else res.status(201).send("Törlés sikeresen végrehajtva");
    });*/
    res.send(req);
});

app.post("/upld", (req,res) =>{
    
    res.send("Fasza");
})

app.listen(3000);

console.log("Szerver fut a 3000-es porton")