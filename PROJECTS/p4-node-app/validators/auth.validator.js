import { check, validationResult } from 'express-validator';

const registerValidation = [
  check('name')
    .trim()
    .notEmpty().withMessage('Name required!')
    .isString(),

  check('email')
    .trim()
    .notEmpty().withMessage('Email required!')
    .isEmail().withMessage('Invalid email format!'),

  check('password')
    .notEmpty().withMessage('Password required!')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long!'),
];

const signInValidation = [
  check('email')
    .trim()
    .notEmpty().withMessage('Email required!')
    .isEmail().withMessage('Invalid email!'),

  check('password')
    .notEmpty().withMessage('Password required!'),
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
  registerValidation,
  signInValidation,
  validate
};