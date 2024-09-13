const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/UsuarioController');
const passport = require('../config/passport');

// Middleware para proteger rutas
const authenticate = passport.authenticate('jwt', { session: false });

// Rutas CRUD
router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.post('/register', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.get('/current', authenticate, usuarioController.obtenerUsuarioPorId); 
router.put('/:id', authenticate, usuarioController.actualizarUsuario); 
router.delete('/:id', authenticate, usuarioController.eliminarUsuario); 

module.exports = router;





