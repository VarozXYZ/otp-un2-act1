import express from "express";

const db = [
    { id: 1, name: "Cloud Strife", job: "Soldier", weapon: "Buster sword", level: 25 },
    { id: 2, name: "Tifa Lockhart", job: "Fighter", weapon: "Leather gloves", level: 22 },
    { id: 3, name: "Aerith Gainsborough", job: "Mage", weapon: "Magic staff", level: 20 }
]

const app = express();
app.use(express.json());

app.get("/characters", (req, res) => {
    res.send(db);
})

app.get("/characters/:id", (req, res) => {
    const character = db.find(c => c.id == req.params.id);
    if (character) {
        res.send(character);
    } else {
        res.status(404).send("Character ID not found on database");
    }
})

app.post("/characters", (req, res) => {
    const newChar = req.body;
    if (!newChar) {
        return res.status(400).send("Empty character data");
    }
    for (const character of db) {
        if (newChar.id == character.id) {
            return res.status(400).send("Repeated character ID");
        }
        if (newChar.name == character.name) {
            return res.status(400).send("Repeated character name");
        }
    }
    if (newChar.level < 1 || newChar.level > 100) {
        return res.status(400).send("Level must be between 1 and 99");
    }
    
    db.push(newChar);
    res.send("Character added successfully");
})

app.listen(8080, () => {
    console.log("Final Fantasy VII Remake character manager started (Port: 8080)")
})