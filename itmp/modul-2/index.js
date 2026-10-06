const express = require("express");
const app = express();

app.use(express.json());

let users = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    {
      id: "3",
      name: "Sam Johnson",
      email: "sam.johnson@example.com",
    },
  ];


app.get("/users", (req, res) => {
    res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
    
    users.forEach(element => {
        console.log(element.id == req.params.id)
        
        if(req.params.id == element.id){
            res.status(200).send(element);
        } 
    });
});

app.post("/users", (req, res) => {
    let maxId = 0;
    users.forEach(element => {
        if(element.id > maxId) maxId = element.id;
    });
    maxId += 1;
    users.push({id: maxId, name: "Apple", email: "apple@apple.app"});
    res.status(200).send("Feltöltve!");
});

app.put("/users/:id", (req, res) => {
    let userToEdit = users[0];
    users.forEach(element =>{
        if(element.id == req.params.id) userToEdit = element;
    });
    users[users.indexOf(userToEdit)].name = "EditedName";
    res.status(200).send("Változtatva!");
    

});

app.delete("/users/:id", (req, res) => {
    users.forEach(element => {
        if(element.id == req.params.id) users.pop(element);
    });
    res.status(200).send("Törlés sikeres!");
});

app.listen(3000, (err) => {
    if(err) console.log(err);
    else console.log("Running on port 3000!");
});