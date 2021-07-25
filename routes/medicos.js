/*
    MEDICOS
    API: /api/medicos
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos} = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { 
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico } = require('../controllers/medicos');

const router = Router();

router.get('/'  ,getMedico  );

router.post('/', 
    [
        validarJWT,
        check('nombre','Nombre es obligatorio').not().isEmpty(),
        check('hospital','Hospital debe de ser un ID válido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id',
    [
        
    ],
    actualizarMedico
);
router.delete('/:id',
borrarMedico
);

module.exports = router;