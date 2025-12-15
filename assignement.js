import express from "express";
import jwt from "jsonwebtoken";
import {z} from "zod";

const app = express();
app.use(express.json());

const port = 3000;

const JWT_SECRET_KEY = "Abhash";

const loginSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6),
})

app.get('/', (req, res) => {
    res.send("hello world");
})

//Middlewares
//1. login number of req on server
let loginCount = 0;
function countLoginReq(req, res, next){
    loginCount+=1;
    console.log(loginCount);
    next();
}

//2. Middleware for rate limiting a user req based on the username passed in header

//1.
function generateToken(username, password){
    const result = loginSchema.safeParse({username, password});
    if(!result.success){
        return null;
    }
    const token = jwt.sign({username: username}, JWT_SECRET_KEY);
    return token;
}
app.post("/login", countLoginReq, (req, res) => {
    const {username, password} = req.body;
    const token = generateToken(username, password);
    if(!token){
        return res.status(401).json({msg: "Invalid credentials"});
    }

    res.status(200).json({msg: "Token is generated", token: token});
})

//2. 
function checkJwt(token){
    const decode = jwt.decode(token);
    if(decode){
        return true;
    }
    return false;
}

//3. 
function verifyJwt(token){
    try{
        const verify = jwt.verify(token, JWT_SECRET_KEY);
        return true;
    }catch(err){
    console.log(err);
    return false;
   }
}
app.get('/jwt', (req, res) => {
    const token = req.headers.authorization;
    const verify = verifyJwt(token);
    if(!verify){
        return res.status(401).json({msg: "Token not valid"});
    }
    res.status(200).json({msg: "Token verified"});
})


app.listen(port);
