import { Router } from "express";
import User from "../models/User.js";
import { generateToken } from "../services/token.js";
import bctypt from "bcrypt";

const router = Router();

router.get('/login',(req,res) => {
    if(req.cookies.token){
        res.redirect('/')
        return
    }
    res.render('login',{
        title:'Shop | Login',
        isLogin: true,
        loginError: req.flash('loginError') 
    })
})

router.get('/logout',(req,res) => {
    res.clearCookie('token');
    res.redirect('/login')
})

router.get('/register',(req,res) => {
    if(req.cookies.token){
        res.redirect('/')
        return
    }
    res.render('register',{
        title:'Shop | Register',
        isRegister: true,
        registerError: req.flash('registerError')
    })
})



// LOGIN USER

router.post('/login',async (req,res) => {
    // GET DATA FROM FORM
    const {email,password} = req.body;
    // CHECK IF ALL FIELDS ARE FILLED
    if(!email || !password){
        req.flash('loginError','All fields are required');
        res.redirect('/login');
        return
    }
    // CHECK IF USER EXIST
    const exUser = await User.findOne({email});
    if(!exUser){
        req.flash('loginError','User not found');
        res.redirect('/login');
        return
    }
    // CHECK IF PASSWORD IS CORRECT
    const isMatch = await bctypt.compare(password,exUser.password);
    if(!isMatch){
        console.log('Password not match');
        return
    }
    console.log('User found');
    console.log(exUser);
    // GENERATE TOKEN
    const token = generateToken(exUser._id);
    // SET COOKIE
    res.cookie('token',token,{httpOnly: true,secure:true})
    res.redirect('/')
})

// REGISTER USER

router.post('/register',async (req,res) => {
    // GET DATA FROM FORM
    const {firstName,email,password} = req.body;
    // CHECK IF ALL FIELDS ARE FILLED
    if(!firstName || !email || !password){
        req.flash('registerError','All fields are required');
        res.redirect('/register');
        return
    }
    // CHECK IF USER ALREADY EXIST
    if(await User.findOne({email})){
        req.flash('registerError','Email already exist');
        res.redirect('/register');
        return
    }
    // HASH PASSWORD
    const hashedPassword = await bctypt.hash(password,10);
    // CREATE USER
    const userDate = {
        firstname: firstName,
        email: email,
        password: hashedPassword
    }
    // SAVE USER TO DB
    const user = await User.create(userDate);
    // GENERATE TOKEN
    const token = generateToken(user._id);
    // SET COOKIE
    res.cookie('token',token,{httpOnly: true,secure:true})
    res.redirect('/')
})

export default router;