const Hospital = require('../models/hospital');
const { response } = require('express');

const getHospital = async(req, res=response) =>{

    const hospitales = await Hospital.find()
                                        .populate('usuario','nombre email');
    res.json({
        ok:true,
        hospitales,
        msg:'Hospital encontrado'
    });
};

const crearHospital = async(req, res=response) =>{

    const uid = req.uid;
    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    });

    try {

        //guardar hospital
        const hospitalDB = await hospital.save();
        
        res.json({
            ok:true,
            hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

};

const actualizarHospital = async(req, res=response) =>{

    const id = req.params.id;

    //dispongo del uid por que se paso la autenticacion del jwt
    const uid =  req.uid;
    
    try {
        
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok:false,
                msg:'Hospital no encontrado por id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario:uid
        };

        //El new true es para que se vea el resultado en el postman del cambio que se realizo
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new:true});

        res.json({
            ok:true,
            msg:'Hospital actualizado',
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    };


};

const borrarHospital = async(req, res=response) =>{

    const id = req.params.id;

    try {
        
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok:false,
                msg:'Hospital no encontrado por id'
            });
        }

        await Hospital.findByIdAndDelete(id)

        res.json({
            ok:true,
            msg:'Hospital eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    };
};

module.exports = {
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
}