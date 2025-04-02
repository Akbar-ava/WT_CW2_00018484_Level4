const { body } = require('express-validator');

const userValidationRules = () => { 
  return [
    body('weight')
      .notEmpty().withMessage('Weight must not be empty')
      .matches(/^\d{1,3}$/).withMessage('Weight must be a Number and with up to 3 digits'),
    body('goal')
      .notEmpty().withMessage('Goal type must not be empty'),
    body('description')
  ];
};

module.exports = {
  userValidationRules
};
