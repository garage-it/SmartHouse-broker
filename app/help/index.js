'use strict';

const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, 'help.txt'), 'utf8', output);

function output(err, words){
    if (err){ throw err; }

    console.log(words.grey);
}
