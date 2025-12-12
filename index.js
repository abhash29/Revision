/*function sqaure(n){
    return n*n;
}
function cube(n){
    return n*n*n;
}
function quad(n){
    return n*n*n*n;
}

function sum(a, b, fn){
    var val1 = fn(a);
    var val2 = fn(b);
    return val1+val2;
}

console.log(sum(2, 3, cube));

function onDone(){
    console.log('hi there');
}
setTimeout(onDone, 1000);
console.log("after timeout");

const fs = require("fs");

fs.readFile("a.txt", "utf-8", function(err, data){
    console.log('File is being read');
    console.log(data);
    data=data+"Update karo";
    fs.writeFile('a.txt', data, () => {
        console.log("file updated");
    });
});*/
//Express

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Hello world");
});
app.post('/conversation', (req, res) => {
    console.log(req.headers);
    console.log(req.query.message);
    console.log(req.body);
    res.send({
        msg: "2+2=4"
    });
})
app.listen(PORT, () => {
    console.log(`Port is running at: ${PORT}`);
})
