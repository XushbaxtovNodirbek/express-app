import { Router } from "express";
import Product from "../models/Product.js";
import authMid from "../middleweares/auth.js";
import {getUserId,checkTokenIsEx} from "../services/token.js";

const router = Router();

router.get('/',async(req,res) => {
    // RENDER HOME PAGE
    res.render('index',{
        title:'Shop | Home',
        products:await Product.find().lean()
    })
});

router.get('/add',authMid,(req,res) => {
    // RENDER ADD PAGE
    res.render('add',{
        title:'Product | Add',
        isAdd: true,
        prductsaveError: req.flash('prductsaveError')
    })
});

router.post('/add-products',async (req,res) =>{
    // GET DATA FROM FORM
    const { title, description, image, price, productId} = req.body;
    // CHECK IF ALL FIELDS ARE FILLED
    if(!title || !description || !image || !price){
        req.flash('prductsaveError','All fields are required');
        res.redirect('/add');
        return
    }
    // CHECK IF PRODUCT EXIST
    if(productId){
       await Product.findByIdAndUpdate(productId,{
        title,
        description,
        image,
        price
       })
         res.redirect('/products');
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

router.get('/products',authMid,async(req,res) => {
    // GET PRODUCTS FROM DB
    const products = await Product.find({userId: getUserId(req.cookies.token)}).lean();
    // RENDER PRODUCTS PAGE
    res.render('product',{
        title:'Shop | Products',
        isProduct: true,
        products: products
    })
});
// DETAIL PAGE
router.get('/product-about',async (req,res) => {
    // GET ID FROM URL
    const id = req.query.id;
    // GET PRODUCT FROM DB
    const product = await Product.findById(id).lean();
    // RENDER PRODUCT PAGE
    res.render('detail',{
        title:'Shop | Product',
        isProduct: true,
        product: product
    })
})
// DELETE PRODUCT
router.get('/product-delete',async (req,res) => {
    // GET ID FROM URL
    const id = req.query.id;
    // DELETE PRODUCT FROM DB
    await Product.findByIdAndDelete(id);
    // REDIRECT TO PRODUCTS PAGE
    res.redirect('/products');
})
// EDIT PRODUCT
router.get('/product-edit',async (req,res) => {
    // GET ID FROM URL
    const productId = req.query.id;
    // RENDER EDIT PAGE
    res.render('add',{
      title:'Shop | Edit',
      productId  
    })
})

export default router;