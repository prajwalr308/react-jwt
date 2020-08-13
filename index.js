require('dotenv').config();
const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const cors=require('cors');
const {verify}=require('jsonwebtoken');
const {hash,compare}=require('bcrypt');
const {fakeDb}=require('./fakeDb');


app.use(cookieParser());

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}));


app.use(express.json());



app.use(express.urlencoded({extended:true}));//supports url encoded bodies


app.listen(process.env.PORT,()=>{
    console.log(`server listening on port ${process.env.PORT}`)
});

//registe user

app.post('/register',async(req,res)=>{
    const {email,password}=req.body;

    try {
        //check if user exists
        const user=fakeDb.find(user=>user.email===email);
        if(user) throw new Error('user already exist');
        //if user doesnt exist ,hash the pass
        const hashedPassword = await hash(password,10);
        fakeDb.push({
            id:fakeDb.length,
            email,
            password:hashedPassword
        })
        res.send({
            message:'user created'
        })
        console.log(fakeDb);
    } catch (error) {
        res.send({error:`${error.message}`})
    }
})