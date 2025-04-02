const { validationResult } = require('express-validator');
const goalService = require('../services/goal');

const goalController = {

  getById: (req, res) => {
    try {
      const goal = goalService.getById(req, res);
      res.render('goal/create_update', { goal }) //creating goal
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAll: (req, res) => {
    try {
      const goals = goalService.get(req, res); //rendering goals
      res.render('goal/index', { goals })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('goal/create_update', { errors: errors.array(), goal: req.body });
    }
    try {
      await goalService.insert(req, res); //creating 
      res.redirect('/goal');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => { //updating the existing goal
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('goal/create_update', { errors: errors.array(), goal: req.body });
    }
    try {
      const updatedGoal = goalService.update(req, res);
      if (!updatedGoal) {
        return res.status(404).json({ error: 'Goal is not found' });
      }
      res.redirect('/goal');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: (req, res) => { //deleting the goal by id
    try {
      const deleted = goalService.delete(req, res);
      if (!deleted) {
        return res.status(404).json({ error: 'Goal is not found' });
      }
      res.redirect('/goal');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = goalController;
