import { Router } from "express";
import Product from "../models/Product.js";
import {getUserId,checkTokenIsEx} from "../services/token.js";
import User from "../models/User.js";

const router = Router();

router.get('/',(req,res) => {
    res.render('index',{
        title:'Shop | Home'
    })
});

router.get('/add',(req,res) => {
    if(checkTokenIsEx(req.cookies.token)){
        res.clearCookie('token');
        res.redirect('/login')
        return
    }
    res.render('add',{
        title:'Product | Add',
        isAdd: true,
        prductsaveError: req.flash('prductsaveError')
    })
});

router.post('/add-products',async (req,res) =>{
    // GET DATA FROM FORM
    const { title, description, image, price} = req.body;
    // CHECK IF ALL FIELDS ARE FILLED
    if(!title || !description || !image || !price){
        req.flash('prductsaveError','All fields are required');
        res.redirect('/add');
        return
    }
    // GET USER ID FROM TOKEN
    const userId = getUserId(req.cookies.token);
    // CREATE NEW PRODUCT
    Product.create({
        title,
        description,
        image,
        price,
        userId
    }).then((product) => {console.log(product);})
    // REDIRECT TO PRODUCTS PAGE
    res.redirect('/products');
    
})

router.get('/products',(req,res) => {
    if(checkTokenIsEx(req.cookies.token)){
        res.clearCookie('token');
        res.redirect('/login')
        return
    }
    res.render('product',{
        title:'Shop | Products',
        isProduct: true
    })
});

export default router;