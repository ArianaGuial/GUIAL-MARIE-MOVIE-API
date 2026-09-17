const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let movies = [
    { id: 1, title: 'Interstellar', genre: 'Science Fiction', year: 2014 },
    { id: 2, title: 'Avengers: Endgame', genre: 'Action', year: 2019 },
    { id: 3, title: 'Coco', genre: 'Animation', year: 2017 }
];

let nextId = 4;

app.get('/api/movies', (req, res) => {
    res.json(movies);
});

app.get('/api/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find(m => m.id === movieId);

    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
});

app.post('/api/movies', (req, res) => {
    const { title, genre, year } = req.body;

    if (!title || !genre || !year) {
        return res.status(400).json({ error: 'Title, genre, and year are required fields.' });
    }

    const newMovie = {
        id: nextId++,
        title,
        genre,
        year: parseInt(year)
    };

    movies.push(newMovie);
    res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});