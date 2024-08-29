const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const verifyToken = (req,resp,next)=>{
    const token = req.headers['authorization'];
    if (!token){
        return resp.status(400).json({'message':'Empty token!'});
    }
    try{
        const decodedValue = jwt.verify(token,secret);
        req.user = decodedValue;
        next();
    }catch (e){
        resp.status(403).json({'message':'Invalid Token!',error:e});
    }
}

module.exports = verifyToken;