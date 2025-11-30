import { check, validationResult }  from 'express-validator';

const createCategoryValidation = [
  check('name')
    .trim()
    .notEmpty().withMessage('Name required!')
    .isString(),
  
  check('type')
    .notEmpty().withMessage('Category type required!')
    .isIn(['income', 'expense']).withMessage('Invalid account type!'),
  
  check('description')
    .optional()
    .isString()
    .trim(),

  check('color')
    .optional()
    .isString()
    .trim(),
];

const updateCategoryValidation = [
  check('name')
    .optional()
    .trim()
    .notEmpty().withMessage('Name required!')
    .isString(),
  
  check('type')
    .optional()
    .notEmpty().withMessage('Category type required!')
    .isIn(['income', 'expense']).withMessage('Invalid account type!'),

  check('description')
    .optional()
    .isString()
    .trim(),

  check('color')
    .optional()
    .isString()
    .trim(),
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
  createCategoryValidation,
  updateCategoryValidation,
  validate
};


