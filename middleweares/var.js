export default function(req,res,next){
    // CHECK IF USER IS AUTHENTICATED
    const isAuth = req.cookies.token;
    // SET LOCALS
    res.locals.isAuth = isAuth;
    next();
}