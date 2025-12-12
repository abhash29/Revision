const express = require('express');
const app = express();
const port = 3000;

var users = [{
    name: "John",
    kidneys: [{
        health: false,
    }]
}]

app.use(express.json());
app.get('/', (req, res) => {
    const johnKidenys = users[0].kidneys;
    const noOfKidneys = johnKidenys.length;
    let noHealthyKidneys = 0;
    for(let i=0; i<noOfKidneys; i++){
        if(johnKidenys[i].health){
            noHealthyKidneys = noHealthyKidneys+1;
        }
    }
    const noUnhealthyKidneys = noOfKidneys-noHealthyKidneys;
    res.json({
        noOfKidneys,
        noHealthyKidneys,
        noUnhealthyKidneys
    })

})

app.post('/', (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        health: isHealthy
    })
    res.json({msg: "Done"})
})

app.put("/", (req, res) => {
    const johnKidenys = users[0].kidneys;
    for(let i=0; i<johnKidenys.length; i++){
        if(johnKidenys[i].health==false){
            johnKidenys[i].health=true;
        }
    }
    res.json({msg: "Updated"});
})

app.delete("/", (req, res) => {
    if(checkAtleastOneHealtyKidney){
    const newKidneys = [];
    for(let i=0; i<users[0].kidneys.length; i++){
        if(users[0].kidneys[i].health){
            newKidneys.push({
                health: true
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({msg: "Donee"})
    }
    else{
        res.status(411).json({msg: "You dont have unhealty kidney"});
    }
    
})
function checkAtleastOneHealtyKidney(){
    let unheathyKidey = false;
    for(let i=0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].health){
            unheathyKidey = true;
        }
    }
    return unheathyKidey;
}
app.listen(port, () => {
    console.log(`Port is running at: ${port}`)
})
