// Required Modules
const fs = require("fs");
const noteInfo = require("../db/db.json");

module.exports = function (application) {


    function writeInfoToDB(notes) {
        // Converts new JSON Array back to string
        notes = JSON.stringify(notes);
        console.log(notes);
        // Writes String back to db.json
        fs.writeFileSync("./db/db.json", notes, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }


    // GET Method to return all the notes
    application.get("/api/notes", function (req, res) {
        res.json(noteInfo);
    });

    // POST Method to add to the notes
    application.post("/api/notes", function (req, res) {

        // Set unique id to info entered
        if (noteInfo.length == 0) {
            req.body.id = "0";
        } else {
            req.body.id = JSON.stringify(JSON.parse(noteInfo[noteInfo.length - 1].id) + 1);
        }

        console.log("req.body.id: " + req.body.id);

        // Pushes Body info to JSON Array
        noteInfo.push(req.body);

        // Writes the note data to the database
        writeInfoToDB(noteInfo);
        console.log(noteInfo);

        // returns a new note in JSON format.
        res.json(req.body);
    });

    // DELETE Method to delete note with specified ID
    application.delete("/api/notes/:id", function (req, res) {

        // Obtains id and converts to a string
        let id = req.params.id.toString();
        console.log(id);

        // Goes through notesArray searching for matching ID
        for (i = 0; i < noteInfo.length; i++) {

            if (noteInfo[i].id == id) {
                console.log("match!");
                // responds with deleted note
                res.send(noteInfo[i]);

                // Removes the deleted note
                noteInfo.splice(i, 1);
                break;
            }
        }


        // Writes the notes data to the database
        writeInfoToDB(noteInfo);

    });
};