const express = require("express");
const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const connection = mysql2.createPool({
    host: process.env.HOST,
    port: 3307,
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
});

app.get("/api", (req, res) => {
    res.send("API ✅");
});

app.get("/api/zenekar", (req, res) => {
    connection.query("SELECT id, nev, stilus_id, aktiv_evek, tagok, legsikeresebb_album, kep_url FROM zenekarok", (err, results, fields) => {
        if(err) throw err;
        res.status(200).send(results)
    })
});

app.post("/api/ujzenekar", (req, res) => {
    connection.query(`INSERT INTO zenekarok (nev, stilus_id, orszag, varos, aktiv_evek, tagok, legsikeresebb_album, kep_url) VALUES (?,?,?,?,?,?,?,?)`,
        [req.body.nev, req.body.stilus_id, req.body.orszag, req.body.varos, req.body.aktiv_evek, req.body.tagok, req.body.legsikeresebb_album, req.body.kep_url], (err, result) => {
                if(err)
                {
                    res.status(401).send("Hiányos adatok");
                    console.log(err);
                    return;
                }
                res.status(201).send("Sikeres feltöltés");
    })
})

app.get("/api/stilusok", (req, res) => {
    connection.query("SELECT stilus_neve FROM stilusok", (err, results) =>{
        if(err) res.status(500).send("Internal server error");
        res.status(200).send(results);
    })
})

app.listen(process.env.PORT, () =>{
    console.log("API is listening on port 3000 at 127.0.0.1:3000/api");
})