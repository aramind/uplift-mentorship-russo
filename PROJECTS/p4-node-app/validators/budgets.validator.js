import { check, validationResult } from 'express-validator';

const createBudgetValidation = [
  check('category')
    .notEmpty().withMessage('Category required!')
    .isMongoId().withMessage('Invalid Category ID!'),

  check('amount')
    .notEmpty().withMessage('Amount required!')
    .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0!'),

  check('period')
    .notEmpty().withMessage('Period required!')
    .isIn(['weekly', 'monthly', 'yearly']).withMessage('Invalid period!'),

  check('startDate')
    .optional()
    .isDate()
];

const updateBudgetValidation = [
  check('category')
    .optional()
    .isMongoId().withMessage('Invalid Category ID!'),

  check('amount')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0!'),

  check('period')
    .optional()
    .isIn(['weekly', 'monthly', 'yearly']).withMessage('Invalid period!'),

  check('startDate')
    .optional()
    .isDate()
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  const responseObj = {
    success: false,
    errors: errors.array(),
  };

  if (!errors.isEmpty()) {
    return res.status(400).json(responseObj);
  }

  next();
}

export {
  createBudgetValidation,
  updateBudgetValidation,
  validate
};