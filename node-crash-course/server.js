const http = require('http');
const fs = require('fs');
const _ = require('lodash');

//server has reqUIRE and resPONSE
const server = http.createServer((req, res) => {
    //lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('Hi there');
    });

    greet();
    //set header content type
    res.setHeader('Content-Type', 'text/html')
    
    //let url depend on which page should appear
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
    //redirects to about.html if about-me was in url
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    
    //find a file in "views" folder, error if nothing is found
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            res.end(data);
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
});

//do node server in terminal
//and search up localhost:3000 on your browser (Firefox/Google)
//if nothing changes, save this page, ctrl + c on terminal and do node server again
//try nodemon server !...is what I would say if it didn't get errors
//npm init

//before starting, look at the dependencies under package.json and open
//the terminal and enter 'npm i __' __ = each dependency
//this is assuming you're doing this in Visual Studio Code...