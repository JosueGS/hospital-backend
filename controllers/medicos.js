const { response } = require("express");
const hospital = require("../models/hospital");
const Medico = require('../models/medico');
// const Hospital = require('../models/hospital');

const getMedico = async(req, res=response) =>{

    const medicos = await Medico.find()
                                .populate('usuario','nombre')
                                .populate('hospital','nombre')

    res.json({
        ok:true,
        medicos
    });
};

const crearMedico = async(req, res=response) =>{

    const uid = req.uid;
    const medico =  new Medico({
        usuario:uid,
        ...req.body
    });

    try {
        const medicosDB = await medico.save();
        res.json({
            ok:true,
            medico:medicosDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    };

};

const actualizarMedico = async(req, res=response) =>{

    const id =  req.params.id;
    // const hospitalId = req.body.hospital;
    
    //id del usuario ya que paso por la autenticacion
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok:false,
                msg:'Medico no encontrado'
            });
        };

        const cambiosMedico = {
            ...req.body,
            usuario:uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new:true} );

        res.json({
            ok:true,
            msg:'actualizarMedico',
            medico:medicoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
};

const borrarMedico = async(req, res=response) =>{

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.json({
                ok:false,
                msg:'Medico no encontrado por id',
            });
        };

        await Medico.findByIdAndDelete(id)
        res.json({
            ok:true,
            msg:'Medico Eliminado',
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    };

};

module.exports = {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
};