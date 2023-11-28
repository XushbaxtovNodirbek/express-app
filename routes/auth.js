import { Router } from "express";
import User from "../models/User.js";
import bctypt from "bcrypt";

const router = Router();

router.get('/login',(req,res) => {
    res.render('login',{
        title:'Shop | Login',
        isLogin: true,
        loginError: req.flash('loginError') 
    })
})

router.get('/register',(req,res) => {
    res.render('register',{
        title:'Shop | Register',
        isRegister: true,
        registerError: req.flash('registerError')
    })
})

router.post('/login',async (req,res) => {

    const {email,password} = req.body;

    if(!email || !password){
        req.flash('loginError','All fields are required');
        res.redirect('/login');
        return
    }

    // console.log(req.body);
    const exUser = await User.findOne({email});
    if(!exUser){
        req.flash('loginError','User not found');
        res.redirect('/login');
        return
    }
    const isMatch = await bctypt.compare(password,exUser.password);
    if(!isMatch){
        console.log('Password not match');
        return
    }
    console.log('User found');
    console.log(exUser);
    res.redirect('/')
})

router.post('/register',async (req,res) => {
    const {firstName,email,password} = req.body;

    if(!firstName || !email || !password){
        req.flash('registerError','All fields are required');
        res.redirect('/register');
        return
    }
    if(await User.findOne({email})){
        req.flash('registerError','Email already exist');
        res.redirect('/register');
        return
    }
    const hashedPassword = await bctypt.hash(password,10);

    const userDate = {
        firstname: firstName,
        email: email,
        password: hashedPassword
    }
    
    const user = await User.create(userDate);
    console.log(user);

    res.redirect('/')
})

export default router;