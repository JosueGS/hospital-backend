/*
    PATH: '/api/login'
*/

const  {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSyncIN, renewToken } =  require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google',
    [
        check('token', 'El token es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSyncIN
);

router.get('/renew',
    validarJWT,
    renewToken
)









module.exports = router;