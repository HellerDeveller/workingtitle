//same thing but express

const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//connect to mongoDB, still gives deprecation warning...?
//and is where you connect to localhost 3000
const dbURI = "mongodb+srv://some_idiot:test1235@nodetuts.bwba1.mongodb.net/nodetuts?retryWrites=true&w=majority&appName=nodetuts";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');
//app.set('views', 'myviews');

//middleware (next is undefined...? whatever, this works)
//oh and uh, static files: it looks in a folder called 'public'
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sanbox routes, put /add-blog or /single-blog in url and see what happens!
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about me blog',
        body: 'so about my blogogog'
    });

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
    Blog.findById("66f9ce941b1a8214d831d1fb")
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

//home page
app.get('/', (req, res) => {
    //res.sendFile('./views/index.html', {root: __dirname});

//take away blogs to see the 'there are no blogs' message!
/*
    const blogs = [
        {title: 'Awooga', snippet: 'They do that sometimes ;)'},
        {title: 'Help', snippet: 'The guy above me is a creep :<'}
    ];

    res.render('index', { title: 'Home', blogs });
*/
    res.redirect('/blogs');
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

//blog routes (see home page), also sorts them by newest
app.get('/blogs', (req, res) => {
    Blog.find().sort({ creatdAt: -1 })
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
        console.log(err);
    });
});

//make your blogs come true WOOOO (also check middleware, it requires
//app.use(express.urlencoded({ extended: true })); to work properly)
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details', { blog: result , title: 'Blog Details' });
    })
    .catch((err) => {
        console.log(err);
    })
})

//deleting your own hard work (blogs)
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        })
})

//create blogs EJS STYLE!!!
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

//404 page, must be at bottom (gives a different error page...?)
app.use((res, req) => {
    //res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', { title: '404' });
});