import { Router } from "express";
import User from "../models/User.js";
import bctypt from "bcrypt";

const router = Router();

router.get('/login',(req,res) => {
    res.render('login',{
        title:'Shop | Login',
        isLogin: true
    })
})

router.get('/register',(req,res) => {
    res.render('register',{
        title:'Shop | Register',
        isRegister: true
    })
})

router.post('/login',async (req,res) => {
    // console.log(req.body);
    const exUser = await User.findOne({email: req.body.email});
    if(!exUser){
        console.log('User not found');
        return
    }
    const isMatch = await bctypt.compare(req.body.password,exUser.password);
    if(!isMatch){
        console.log('Password not match');
        return
    }
    console.log('User found');
    console.log(exUser);
    res.redirect('/')
})

router.post('/register',async (req,res) => {
    const hashedPassword = await bctypt.hash(req.body.password,10);

    const userDate = {
        firstname: req.body.firstName,
        email: req.body.email,
        password: hashedPassword
    }
    
    const user = await User.create(userDate);
    console.log(user);

    res.redirect('/')
})

export default router;