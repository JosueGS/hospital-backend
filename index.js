require('dotenv').config();

const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./databases/config')

//crear servidor
const app = express();

//configurar cors
app.use(cors())

//Base de datos
dbConnection();


app.get('/', (req, res)=>{
    res.json({
        ok: 200,
        msg: 'Hello world'
    })
})


app.listen(process.env.PORT  , ()=>{
    console.log('Servidor corriendo puerto ' + process.env.PORT);

} )

