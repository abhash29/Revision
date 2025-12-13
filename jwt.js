const express = require('express');
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken');
const jwtPassword = '123456';
const mongoose = require('mongoose');
const { email } = require('zod');

mongoose.connect("mongodb+srv://abhash29:Abhash%406685@cluster0.07ms2qn.mongodb.net/users");

const AllUsers = [
    {
        username: "harkirat@gmail.com",
        password: "123",
        name: "harkirat singh"
    },
{
        username: "raman@gmail.com",
        password: "123321",
        name: "Raman singh"
    },{
        username: "priya@gmail.com",
        password: "123456",
        name: "Priya singh"
    },
]

//Mongodb
const User = mongoose.model("Users", {username: String, password: String, name: String});
//const user = new User({username: "abhash29@gamil", password: "124", name: "abhash"});
//user.save();


function userExists(username, password){
    for(let i=0; i<AllUsers.length; i++){
        if(AllUsers[i].username==username && AllUsers[i].password==password){
            return true;
        }
    }
    return false;
}
app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)){
        return res.status(403).json({msg: "User does not exits in memory"})
    }

    var token = jwt.sign({username: username}, jwtPassword);
    res.json({
        token,
    })
})

app.get('/users', (req, res) => {
    const token = req.headers.authorization;
    try{
        const decode = jwt.verify(token, jwtPassword);
        const username = decode.username;
    }
    catch(err){
        return res.status(403).json({msg: "Invalid token"});
    }
})

app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await User.findOne({username: username});
    if(existingUser){
        return res.status(411).json({msg: "User already exits"});
    }
    else{
        const user = new User({
            username: username,
            password: password,
            name: name,
        });
        await user.save();
        res.status(200).json({msg: "User created successfully"});
    }
})

app.get('/', (req, res) => {
    res.send("JWT Auth");
})
app.listen(3000);
