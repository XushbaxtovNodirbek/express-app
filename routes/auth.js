import { Router } from "express";

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
    console.log(req.body);
    res.redirect('/')
})

router.post('/register',(req,res) => {
    console.log(req.body);
    res.redirect('/')
})

export default router;