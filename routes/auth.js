import { Router } from "express";
import User from "../models/User.js";

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

router.post('/login',(req,res) => {
    // console.log(req.body);
    res.redirect('/')
})

router.post('/register',async (req,res) => {

    const userDate = {
        firstname: req.body.firstName,
        email: req.body.email,
        password: req.body.password
    }
    
    const user = await User.create(userDate);
    console.log(user);

    res.redirect('/')
})

export default router;