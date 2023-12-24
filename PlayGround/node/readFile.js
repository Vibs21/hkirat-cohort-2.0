const fs = require('fs');

fs.readFile('a.txt', 'utf-8', function(err,data) {
    console.log(data);
})

console.log('hi there 1');


 function sum(a,b) {
     a+b;
 }

 console.log('check', sum(2,3));
