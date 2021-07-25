const {Schema, model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const HospitalSchema = Schema({

    nombre:{
        type: String,
        required:true
    },
    img:{
        type:String
    },
    usuario:{
        required:true,
        type: Schema.Types.ObjectId, //relaccio con id usuario
        ref: 'Usuario'
    }


},{ collection:'hospitales'});

HospitalSchema.plugin(uniqueValidator);

HospitalSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    // object.idh = _id;
    return object;
});

module.exports = model('Hospital', HospitalSchema);