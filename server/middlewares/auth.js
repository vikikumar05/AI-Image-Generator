import jwt from 'jsonwebtoken';


const userAuth = async(req, res, next) => {
    const {token} = req.headers;

    if(!token){
        return res.status(401).json({message: "Unauthorized, no token provided"});
    }

    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id){
            req.userId = tokenDecode.id;
        }else{
            return res.status(401).json({message: "Unauthorized, invalid token, Login Again."});
        }

        next();

    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export default userAuth;