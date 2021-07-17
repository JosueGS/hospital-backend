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

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT  , ()=>{
    console.log('Servidor corriendo puerto ' + process.env.PORT);

} )

