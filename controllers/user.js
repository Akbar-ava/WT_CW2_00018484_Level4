const { validationResult } = require('express-validator');
const userService = require('../services/user');

const userController = {

  getById: (req, res) => {
    try {
      const user = userService.getById(req, res);
      res.render('user/create_update', { user }) //cfeating user
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAll: (req, res) => {
    try {
      const users = userService.get(req, res); //rendering users
      res.render('user/index', { users })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('user/create_update', { errors: errors.array(), user: req.body });
    }
    try {
      await userService.insert(req, res); //creating 
      res.redirect('/user');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('user/create_update', { errors: errors.array(), user: req.body });
    }
    try {
      const updatedUser = userService.update(req, res);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User is not found' });
      }
      res.redirect('/user');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: (req, res) => {
    try {
      const deleted = userService.delete(req, res);
      if (!deleted) {
        return res.status(404).json({ error: 'User is not found' });
      }
      res.redirect('/user');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userController;
