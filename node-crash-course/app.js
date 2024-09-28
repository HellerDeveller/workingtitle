//same thing but express

const express = require('express');
const app = express();

//make localhost
app.listen(3000);

//home page
app.get('/', (req, res) => {
    res.sendFile('./views/index.html', {root: __dirname});
});

//about page
app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', {root: __dirname});
});

//redirects to about.html
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

//404 page, must be at bottom
app.use((res, req) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});