import { Router } from "express";

const router = Router();

router.get('/',(req,res) => {
    res.render('index',{
        title:'Shop | Home'
    })
});

router.get('/add',(req,res) => {
    res.render('add',{
        title:'Product | Add',
        isAdd: true
    })
});

router.get('/products',(req,res) => {
    res.render('product',{
        title:'Shop | Products',
        isProduct: true
    })
});

export default router;