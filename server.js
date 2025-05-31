const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const mongoose = require('mongoose')
const Fakestore = require('./models/Store')
const Counter = require('./models/Counter')
const cors = require('cors')
const bcrypt = require('bcryptjs');
const User = require('./models/Users'); // Adjust path if needed
const jwt = require('jsonwebtoken')


app.use(express.json())     //Default format

// CORS configuration
const corsOptions = {
  origin: ['https://fakestoreproductsfrontend.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions))


// MongoDB connection string should be in environment variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jadavijay555:Myfakeapi123@cluster0.gedbite.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(MONGODB_URI)

.then(() => {
    console.log('db connected')
})
.catch((err) => {
    console.log(err)
})

const JWT_SECRET = process.env.JWT_SECRET || "mytokken"

app.get('/',(req,res) => {
    res.end("Hi, this is store js")
})
//api Create

app.post("/api/store",async(req,res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
          { id: "storeid" },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
        req.body.id = counter.seq;
        const stores = await Fakestore.create(req.body)
        res.status(200).json({success: true, stores})
    }catch(err){
        res.status(500).json({success: false, err})
    }
})

//Read
app.get("/api/store", async (req, res) => {
    try {
        const stores = await Fakestore.find(); // get all documents
        
        res.status(200).json({ success: true, stores});
    } catch (err) {
        res.status(500).json({ success: false, err });
    }
});

//Find by id
app.get("/api/store/:id", async(req,res) => {
    try{
        const id = Number(req.params.id)
        const stores = await Fakestore.findOne({id})
        res.status(200).json({success: true})
    }catch(err){
        res.status(500).json({success: false, err})
    }
})

//Update by Id
app.put("/api/store/:id",async(req,res) => {
    try{
        const {id} = req.params
        const stores = await Fakestore.findByIdAndUpdate(id, req.body,{new:true})
        res.status(200).json({success: true, stores})
    }catch{
        res.status(500).json({success: false, err})
    }
})

//Delete by Id
app.delete('/api/store/:id',async(req,res) => {
    try{
        const {id} = req.params
        await Fakestore.findByIdAndDelete(id)
        res.status(200).send("data is deleted")
    }catch(err){
        res.status(500).json({success: false, err})
    }
})

//Auth model

app.post('/register',async (req,res)=>{
    const  {name,email, password} = req.body;
    const exists = await User.findOne({email})
    if(exists) return res.send("user already registered")
    const hashed = await bcrypt.hash(password, 10)
     const user = await User.create({name,email, password: hashed})
      res.status(200).json({sucess:true, user})
  })
  
  //Login module
  app.post('/login', async (req,res)=>{
  const {email, password} =  req.body;
  const user = await User.findOne({email})
  if(!user) return res.send("user not found")
  
      const match = await bcrypt.compare(password, user.password)
      if(!match) return res.send("pswrd doesnt match")

        // currentUser = user
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '2h'})
      
          res.send({message:"login done ",token})
  
  })

  //Without JWT

//   let currentUser = null;
//   function isLoggedin(req,res,next){
//     if(!currentUser){
//         return res.send("Not login")
//     }
//     next();
//   }

//With JWT
function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.send('missing token')
        const token = authHeader.split(' ')[1];
    try{
        const decode = jwt.verify(token,JWT_SECRET)
        req.userId = decode.id;
        next()
    }catch(err){
        res.send(err)
    }
}

app.listen(port, () => {
    console.log('Server is running')
})
