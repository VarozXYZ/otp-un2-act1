import express from "express";

const db = [
    { id: 1, name: "Cloud Strife", job: "Soldier", weapon: "Buster sword", level: 25 },
    { id: 2, name: "Tifa Lockhart", job: "Fighter", weapon: "Leather gloves", level: 22 },
    { id: 3, name: "Aerith Gainsborough", job: "Mage", weapon: "Magic staff", level: 20 }
]

const app = express();

app.get("/characters", (req, res) => {
    res.send(db);
})

app.get("/characters/:id", (req, res) => {
    console.log(req.params.id)

    db.forEach(character => {
        console.log(character)
        if (character.id == req.params.id) {
            res.send(character)
        }
    })
    res.status(404).send("Character ID not found on database");
})

app.listen(8080, () => {
    console.log("Final Fantasy VII Remake character manager started. (Port: 8080)")
})