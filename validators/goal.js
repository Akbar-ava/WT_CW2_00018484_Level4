const { body } = require('express-validator');

//validation for weight and goal Type
const goalValidationRules = () => { 
  return [
    body('weight') //weight can not be empty and go higher than 3digits (999)
      .notEmpty().withMessage('Weight must not be empty')
      .matches(/^\d{1,3}$/).withMessage('Weight must be a Number and with up to 3 digits'),
    body('goal')
      .notEmpty().withMessage('Goal type must not be empty'), // goal Type cannot be empty
    body('description')
  ];
};

module.exports = {
  goalValidationRules
};
