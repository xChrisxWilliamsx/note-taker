const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require('./db/db.json');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// GET Route for home page (index.html)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index..html')));

// GET Route for notes page (notes.html)
app.get ('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// GET Route for displaying individual notes 
app.get('/api/notes', (req, res) => res.json(notes));

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));