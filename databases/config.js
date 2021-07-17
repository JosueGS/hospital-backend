const mongoose = require('mongoose');

const dbConnection = async()=>{

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('BD online');
        
    } catch (error) {
        console.log(error);

        throw new Error('Error al iniciar la BD ver logs')
    }


}

module.exports = {
    dbConnection
}