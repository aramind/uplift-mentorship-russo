import { check, validationResult } from 'express-validator';

const createAccountValidation = [
  check('name')
    .trim()
    .notEmpty().withMessage('Name required!')
    .isString(),

  check('type')
    .notEmpty().withMessage('Account type required!')
    .isIn(['cash', 'bank', 'credit', 'ewallet']).withMessage('Invalid account type!'),
    

  check('balance')
    .optional()
    .isNumeric(),
];

const updateAccountValidation = [
  check('name')
    .optional()
    .trim()
    .notEmpty().withMessage('Name required!')
    .isString(),

  check('type')
    .optional()
    .isIn(['cash', 'bank', 'credit', 'ewallet']).withMessage('Invalid account type!'),
    

  check('balance')
    .optional()
    .isNumeric(),
]

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
  createAccountValidation,
  updateAccountValidation,
  validate
};