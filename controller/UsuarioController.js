// controller/UsuarioController.js
const UsuarioDao = require('../dao/UsuarioDao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Asegúrate de que la ruta sea correcta

const usuarioDao = new UsuarioDao();
const secretKey = process.env.JWT_SECRET_KEY || 'tareacoder';

class UsuarioController {
  // Obtener todos los usuarios
  async obtenerUsuarios(req, res) {
    try {
      const usuarios = await usuarioDao.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios', details: error.message });
    }
  }

  // Obtener un usuario por ID
  async obtenerUsuarioPorId(req, res) {
    try {
      const usuario = await usuarioDao.findById(req.user._id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el usuario', details: error.message });
    }
  }

  // Registrar un nuevo usuario
  async registrarUsuario(req, res) {
    const { email, password, first_name, last_name, age, role = 'user' } = req.body;

    try {
      // Verificar si el usuario ya existe
      const usuarioExistente = await usuarioDao.findByEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }

      const nuevoUsuario = new User({
        email,
        password, // La contraseña se hasheará en el hook `pre('save')`
        first_name,
        last_name,
        age,
        role,
        cart: null // Asignar el carrito si es necesario
      });

      const usuarioGuardado = await nuevoUsuario.save();
      res.status(201).json(usuarioGuardado);
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
    }
  }

  // Login de usuario
  async loginUsuario(req, res) {
    const { email, password } = req.body;

    try {
      const usuario = await usuarioDao.findByEmail(email);

      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const isPasswordValid = bcrypt.compareSync(password, usuario.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar el token JWT si las credenciales son válidas
      const token = jwt.sign(
        { id: usuario._id, email: usuario.email, role: usuario.role },
        secretKey,
        { expiresIn: '1h' }
      );

      // Enviar el token en una cookie
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 1 hora
      res.json({
        status: "success",
        message: "Logged in"
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
    }
  }

  // Actualizar un usuario
  async actualizarUsuario(req, res) {
    try {
      const usuarioActualizado = await usuarioDao.update(req.params.id, req.body);
      if (!usuarioActualizado) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario', details: error.message });
    }
  }

  // Eliminar un usuario
  async eliminarUsuario(req, res) {
    try {
      const usuarioEliminado = await usuarioDao.delete(req.params.id);
      if (!usuarioEliminado) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario', details: error.message });
    }
  }
}

module.exports = new UsuarioController();





