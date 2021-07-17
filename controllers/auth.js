const {response} =  require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')
const Usuario = require('../models/usuario')

const login = async(req, res =  response)=>{

    const { email, password } = req.body;

    try {

        //verificar correo

        const usuarioDB = await Usuario.findOne( {email});

        if (!usuarioDB) {
            res.status(400).json({
                ok:false,
                msg:'correo invalido'
            })
        }

        //verificar cosntraseña

        const validPassword = bcrypt.compareSync(password, usuarioDB.password)

        if (!validPassword) {
            res.status(400).json({
                ok:false,
                msg:'Contraseña incorrecto'
            });
        };

        //Generear token - JWT

        const token =  await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }


}




module.exports = {
    login
}