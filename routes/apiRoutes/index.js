const path = require('path');
const fs = require('fs');
const router = require('express').Router();

let noteCount = 1;

const readData = () => {
    const noteData = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')))
    return noteData;
}

const writeData = (noteData) => {
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(noteData), (err) => {
        if (err) return ({ err });
    });
}

const newNoteId = () => noteId++;

    router.get('/notes', (req, res) => {
        let noteData = readData();
        res.json(noteData)
    })

    router.post('/notes', (req, res) => {
        let noteData = readData();
        let newNote = req.body;
        let lastNoteId = !noteData[0] ? 0 : noteData[noteData.length - 1].id;
        let newNoteId = lastNoteId + 1;

        newNote.Id = newNoteId;
        noteData.push(newNote);
        writeData(noteData);
        return res.json(noteData)
    })

    router.delete('/notes/:id', (req, res) => {
        let noteData = readData();
        const noteId = req.params.id;
        const newNoteData = noteData.filter((note) => note.id != noteId);

        writeData(newNoteData);
        res.send(newNoteData);
    })

    module.exports = router;