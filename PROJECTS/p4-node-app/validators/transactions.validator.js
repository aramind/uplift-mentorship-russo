import { check, validationResult } from 'express-validator';

const createTransactionValidation = [
  check('account')
    .notEmpty().withMessage('Account required!')
    .isMongoId().withMessage('Invalid account ID!'),
  
  check('category')
    .notEmpty().withMessage('Category required!')
    .isMongoId().withMessage('Invalid category ID!'),
  
  check('type')
    .notEmpty().withMessage('Transaction type required!')
    .isIn(['income', 'expense']).withMessage('Invalid transaction type!'),

  check('amount')
    .notEmpty().withMessage('Amount required!')
    .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0!'),
  
  check('description')
    .optional()
    .isString()
    .trim()
];

const updateTransactionValidation = [
  check('account')
    .optional()
    .notEmpty().withMessage('Account required!')
    .isMongoId().withMessage('Invalid account ID!'),
  
  check('category')
    .optional()
    .notEmpty().withMessage('Category required!')
    .isMongoId().withMessage('Invalid category ID!'),
  
  check('type')
    .optional()
    .notEmpty().withMessage('Transaction type required!')
    .isIn(['income', 'expense']).withMessage('Invalid transaction type!'),

  check('amount')
    .optional()
    .notEmpty().withMessage('Amount required!')
    .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0!'),
  
  check('description')
    .optional()
    .isString()
    .trim()
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
  createTransactionValidation,
  updateTransactionValidation,
  validate
};