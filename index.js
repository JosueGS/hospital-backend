require('dotenv').config();

const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./databases/config')

//crear servidor
const app = express();

//configurar cors
app.use(cors( ));

//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//Directorio publico
app.use( express.static('public') );


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT  , ()=>{
    console.log('Servidor corriendo puerto ' + process.env.PORT);

} );