const jwt  = require('jsonwebtoken')


const validarJWT = (req, res, next)=>{

    const token =  req.header('x-token');
    // console.log(token);

    if (!token) {
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la petición'
        });
        
    }

    //Verificar jwt

    try {

        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid;

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        })
    }

};



module.exports = {
    validarJWT
}