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
    const { id } = req.params;
    const noteD = deleteNote(id, noteData);
    res.json(noteData);
});

// creates note
function createNote(body, noteD) {
    const note = body;
    noteD.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ noteData: noteD }, null, 2)
    );
    return note;
}

function deleteNote(id, noteD) {
    const deletedData = noteD.find(note => note.id === id)
    if (deletedData) {
        noteData = noteD.filter(note => note.id != id)
    }
    fs.writeFileSync(
        path.join(__dirname, '../../db.json'),
        JSON.stringify({ noteData }, null, 2)
    );
    return id;
}

module.exports = router;