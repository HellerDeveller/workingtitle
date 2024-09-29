//same thing but express

const express = require('express');
const app = express();
const morgan = require('morgan');

//register view engine
app.set('view engine', 'ejs');
//app.set('views', 'myviews');

//make localhost
app.listen(3000);

//middleware (next is undefined...? whatever, this works)
//oh and uh, static files: it looks in a folder called 'public'
app.use(express.static('public'));
app.use(morgan('dev'));

//home page
app.get('/', (req, res) => {
    //res.sendFile('./views/index.html', {root: __dirname});

//take away blogs to see the 'there are no blogs' message!
    const blogs = [
        {title: 'Awooga', snippet: 'They do that sometimes ;)'},
        {title: 'Help', snippet: 'The guy above me is a creep :<'}
    ];

    res.render('index', { title: 'Home', blogs });
});

//about page
app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', { title: 'About' });
});

//redirects to about.html
//app.get('/about-us', (req, res) => {
    //res.redirect('/about');
//});

//create blogs EJS STYLE!!!
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

//404 page, must be at bottom (gives a different error page...?)
app.use((res, req) => {
    //res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', { title: '404' });
});