const {response} =  require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')
const Usuario = require('../models/usuario');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require('../models/usuario');

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

const googleSyncIN = async(req, res=response) =>{

    const googleToken = req.body.token;

    try {
        const {name, email, picture} = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({email})
        let usuario;
        if (!usuarioDB) {
            //Si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password:'@@@',
                img: picture,
                google:true,
            })
        } else {
            //si existe, actualiza el usuario google
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardar BD
        await usuario.save();

        //Generear token - JWT
        const token =  await generarJWT(usuario.id);

        res.json({
            ok:true,
            msg:'GoogleSyncIn',
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:true,
            msg:'Token invalido'
        });
    };
};

const renewToken = async(req, res=response) =>{
    
    const uid = req.uid;
    //Generear token - JWT
    const token =  await generarJWT(uid);

    res.json({
        ok:true,
        token
    })
}

module.exports = {
    login,
    googleSyncIN,
    renewToken
}