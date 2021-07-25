/*
    
    Api: api/todo/:busqueda
*/

const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { 
    getTodo, getDocumentosCollection
} = require('../controllers/busquedas');

const router = Router();

router.get('/:busqueda',validarJWT, getTodo);
router.get('/coleccion/:tabla/:busqueda',validarJWT, getDocumentosCollection);

module.exports = router;