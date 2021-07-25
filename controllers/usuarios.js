const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')
const Usuario = require('../models/usuario');

const getUsuarios = async(req, res=response)=>{


    const desde = Number(req.query.desde) || 0;

    const [usuarios, total]= await Promise.all([
        Usuario
            .find({}, 'nombre email google role img')
            .skip(desde)
            .limit(5),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: 200,
        usuarios,
        uid: req.uid,
        total
    });
}

const crearUsuarios = async(req, res = response)=>{

    const { password, email } = req.body;

    try {

        //Revisar si existe correo

        const existeEmail = await Usuario.findOne({ email });

        // console.log(existeEmail);

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg:'El coorreo ya está registrado'
            });
        };
    
        const usuario = new Usuario(req.body);
    
        //Encriptar contraseña

        const salt  =  bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // guardar usuario
        await usuario.save();

        //Generear token
        const token = await generarJWT(usuario.id)


        res.json({
            ok: 200,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado... revisar logs'
        });
    };

};


const actualizarUsuario = async(req, res = response) =>{

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario por ese id'
            });
        };
        
        //Actualizaciones
        
        const {password, google, email,  ...campos} = req.body;
        
        if ( usuarioDB.email !== email ) {

            const existeEmail =  await Usuario.findOne({email});
            if(existeEmail){
                res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese email'
                });
            };
        };

        campos.email = email;

        const usuarioActualizado =  await Usuario.findByIdAndUpdate(uid, campos,{new:true});

        res.json({
            ok: true,
            usuario : usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error inesperado'
        });
    };


};

const borrarUsuario = async(req, res = response)=>{

    const uid = req.params.id;

    try {

        const usuarioBD = await Usuario.findById(uid);
        
        if (!usuarioBD) {
            res.status(404).json({
                ok:false,
                msg:'No existe un usuario por ese id'
            });
        };

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado, .... revisar logs'
        })
    }

};

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
};