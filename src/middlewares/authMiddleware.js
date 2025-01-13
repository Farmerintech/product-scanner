import Jwt from "jsonwebtoken";

export const AuthMiddleware = (req, res, next) =>{
    try {
        const token = req.header("Authorization")?.replace("Bearer", "");
        if(!token){
        req.redirect('/login');
        return res.status(403).json({message:"Unauthorized"});  
    }
    const decoded = Jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
    } catch (error) {
        return res.status(500).json({message:"Seems like your backend guy is sleeping", error})  
    }
}

export const isAdmin = (req, res, next) => {
    if(req.user.role !=="admin"){
        return res.status(403)
        .json({message:"Unauthorized, You hve to been an admine to perform this opration"})  
    }
    next()
}