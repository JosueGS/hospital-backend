const {response} = require('express');
const fs = require('fs');
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');



const fileUpload = (req, res = response) =>{

    const tipo = req.params.tipo,
        id = req.params.id;

    const tiposValidos = ['usuarios', 'hospitales', 'medicos'];

    if (!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok:false,
            msg:'No es un tipo valido, revise tipo'
        })
    };

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No hay ningun archivo'
        });
    };

    //Procesar imagen...
    const file =  req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length -1];

    //Validar extension
    const extensionValida = ['png','jpg','jpeg','gif']
    if (!extensionValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok:false,
            msg:'No es una extension permitida'
        });  
    };

    //Generar nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //path
    const path = `./uploads/${tipo}/${ nombreArchivo }`;

    //Mover imagen
    file.mv( path, (err)=> {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg:'Error al mover la imagen'
            });
        };
        
        //Aqui actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok:true,
            msg:'Archivo movido',
            nombreArchivo
        });

      });
};

const retornaImagen = (req, res=response) =>{
    const tipo = req.params.tipo,
        foto = req.params.foto;

        const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
        
        //imagen por defecto
        if (fs.existsSync(pathImg)) {
            res.sendFile(pathImg);
        } else{
            const pathImg = path.join(__dirname, `../uploads/no-image.png`);
            res.sendFile(pathImg);
        }

};

module.exports = {
    fileUpload,
    retornaImagen
}