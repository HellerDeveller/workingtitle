const fs = require('fs');

//reads blog1.txt file, also demonstrates async with 'last line'
fs.readFile('./docs/blog1.txt', (error, data) => {
    if (error) {
        console.log(error);
    }
    console.log(data.toString());
});

console.log('last line');

//writes on blog2.txt (and creates it if it never existed)
fs.writeFile('./docs/blog2.txt', 'This line was not here before!', () => {
    console.log('check ur files for file 2');
});

//directory, creates an assets folder if it doesn't exist and vice versa
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (error) => {
        if (error) {
            console.log(error);
        }
        console.log('assets folder created');
    })
} else {
    fs.rmdir('./assets', (error) => {
        if (error) {
            console.log(error)
        }
        console.log('assets folder deleted');
    })
}


//deletes a document named deleteme if it exists. make one to test it out!
if (fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', (error) => {
        if (error) {
            console.log(error);
        }
        console.log('the strange file disapates....');
    })
}