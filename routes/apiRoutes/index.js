const fs = require('fs');
const path = require('path');
const router = require('express').Router();
let { noteData } = require('../../db/db.json');


router.get('/notes', (req, res) => {
    let newNotes = noteData;
    res.json(newNotes)
});

router.post('/notes', (req, res) => {
    req.body.id = noteData.length.toString();
    const note = createNote(req.body, noteData);
    res.json(noteData);
});

router.delete('/notes/:id', (req, res) => {
    let noteData = readData();
    const noteId = req.params.id;
    const newNoteData = noteData.filter((note) => note.id != noteId);
    
    writeData(newNoteData);
    res.send(newNoteData);
});

function createNote(body, noteD) {
    const note = body;
    noteD.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ noteData:noteD }, null, 2)
    );
    return note;
}
module.exports = router;