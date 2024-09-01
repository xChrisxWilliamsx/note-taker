const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

// GET Route for home page (index.html)
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page (notes.html)
app.get ('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));