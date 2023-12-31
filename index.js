import express from 'express';
import { create } from 'express-handlebars';
import productRouter from './routes/product.js';
import flash from "connect-flash";
import authRouter from './routes/auth.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import varMiddle from './middleweares/var.js';

dotenv.config();
const app = express();

const hbs = create({defaultLayout:'main',extname:'.hbs'})

// console.log(process.env.MONGO_URI)
app.engine('hbs',hbs.engine);
app.set('view engine','hbs');
app.set('views','./views');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use(flash());
app.use(cookieParser());
app.use(varMiddle);
app.use(session({
    secret: 'xn',
    resave: false,
    saveUninitialized: false,
}))
app.use(productRouter)
app.use(authRouter)

const startApp = () => {
    try {   
        // Port configuration
        const PORT = process.env.PORT || 2100;  
        app.listen(PORT,() => console.log(`Server running on port ${PORT}`))
        // MongoDB connection
        mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to database'))
        // mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => console.log('Connected to database'))
    }catch(err) {
        console.log(err)
    }
} 

startApp();

