import {checkTokenIsEx} from '../services/token.js'

export default function(req,res,next){
    if(checkTokenIsEx(req.cookies.token)){
        res.clearCookie('token');
        res.redirect('/login')
        return
    }
    next()
}