const {Schema, model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const MedicoSchema = Schema({

    nombre:{
        type: String,
        required:true
    },
    img:{
        type:String
    },
    usuario:{
        type: Schema.Types.ObjectId, //relaccio con id usuario
        ref: 'Usuario',
        required:true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required:true
    }


});

MedicoSchema.plugin(uniqueValidator);

MedicoSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    // object.id = _id;
    return object;
});

module.exports = model('Medico', MedicoSchema);