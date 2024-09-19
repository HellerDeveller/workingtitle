//demonstrates streams
const fs = require('fs');

//this ensures blog3.txt gets converted to string with having to do .toString()
const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

/*
readStream.on('data', (chunk) => {
    console.log('-----NEW CHUNK-----');
    console.log(chunk);
    writeStream.write('\nWHOA CHUCNK TIME\n');
    writeStream.write(chunk);
});
*/

//easier way to do the commented code above (delete blog4 to see again)
readStream.pipe(writeStream);
console.log("File copied, check out the mess")