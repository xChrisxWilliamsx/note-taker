const express = require('express');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3001;
const app = express();
let notes = require('./db/db.json') || [];

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// GET Route for home page (index.html)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index..html')));

// GET Route for notes page (notes.html)
app.get ('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// GET Route for displaying individual notes 
app.get('/api/notes', (req, res) => res.json(notes));

// Post Request takes user title and text input ads to db file and displays on screen 
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    const noteId = (() => {
        const id = Date.now();
        id.toString;
        return id;
    });
    if (title && text) {
        const addNote = {
            id: noteId(),
            title: title,
            text: text,
        }
        notes.push(addNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2) , 'utf-8', (err) => err && console.error(err));
    };
});

// Grabs selected notes id.  Filters all objects in database till it finds the note with a matching id.  Removes that targeted notes and sends the new array of updated notes back to db.  
app.delete("/api/notes/:id", (req, res) => {
    const selectedId = req.params.id;
    const numId = Number(selectedId)
    notes = notes.filter(note => note.id !== numId);
    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2) , 'utf-8', (err) => err && console.error(err));
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));