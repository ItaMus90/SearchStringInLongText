const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const Matcher = require('../libs/matcher');

require('dotenv').config()

const search = process.env.SEARCH.split(' ');

const searchStream = () => {
    return new Promise(resolve => {
       const inStream = fs.createReadStream(`${process.env.PATH_FILENAME}`)
       const outStream = new stream;
       const readLines = readline.createInterface(inStream, outStream);
       const maxLines = process.env.MAX_LINE;
       const matcher = new Matcher();
       let lines = [];

       readLines.on('line', (line) => {
            if (lines.length < maxLines){
                lines.push(line)
            }else{
                matcher.findMatchWords(lines, search);
                lines = [];
                //for the empty line
                lines.push(line);
            }
       });

       readLines.on('close', () => {
           matcher.aggregator.print();
           resolve(true);
       });
    });
}

module.exports = async () => {
    await searchStream()
};