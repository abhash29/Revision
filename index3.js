const express = require('express');
const app = express();

/*let requestCount = 0;

function calReq(req, res, next) {
    requestCount++;
    console.log(requestCount);
    next();
}
app.use(calReq);

//Find the avg time does that your req gets
function avgTime(req, res, next){
    next();
}

app.get('/health-checkup', (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = req.query.kidneyId;

    if(username=="abhash29" && password=="pass"){
        if(kidneyId==1 || kidneyId===2){
            res.json({msg: "Your kidney is fine"});
        }
        else{
            res.json({msg: "Not fine kidney"})
        }
        res.json({msg: "Login successful"});
    }
})



app.get('/calreq', (req, res) => {
    res.send("Request counted");
});*/

app.use(express.json());
app.post('/health-checkup', (req, res) => {
    const kidneys = req.body.kidneys;
    const kidneysLength = kidneys.length;
    res.send(`You have ${kidneysLength} of kidneys`);
})

app.listen(3000);
