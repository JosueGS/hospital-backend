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

const actualizarHospital = (req, res=response) =>{
    res.json({
        ok:true,
        msg:'actualizarHospital'
    });
};

const borrarHospital = (req, res=response) =>{
    res.json({
        ok:true,
        msg:'borrarHospital'
    });
};

module.exports = {
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
}